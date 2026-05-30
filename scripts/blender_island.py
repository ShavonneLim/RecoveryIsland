"""
Recovery Island — Blender Scene Generator
==========================================
HOW TO USE:
  1. Open Blender (4.0+ recommended)
  2. Go to the Scripting workspace (top tab bar)
  3. Click "New" to create a new script
  4. Paste this entire file in
  5. Click the ▶ Run Script button
  6. Wait ~10 seconds for the scene to build
  7. Press Numpad 0 to see the camera view
  8. Press Ctrl+F12 to render the full animation (300 frames = 10s loop)
  9. Output file: recovery_island_animation.mp4 next to your .blend file

To render faster:
  - Edit > Preferences > System > Cycles Render Devices → enable GPU
  - In the script, change RENDER_SAMPLES to 64 for a preview render

Output: 1920×1080, 10-second seamless loop, H.264 MP4
"""

import bpy
import bmesh
import math
import random
from mathutils import Vector, Euler

# ─────────────────────────────────────────────────────────────────────────────
# CONFIG — tweak these before running
# ─────────────────────────────────────────────────────────────────────────────
RENDER_SAMPLES   = 128          # 64 = fast preview, 256 = final quality
RENDER_WIDTH     = 1920
RENDER_HEIGHT    = 1080
TOTAL_FRAMES     = 300          # 10 seconds at 30fps — seamless loop
OUTPUT_FILENAME  = "//recovery_island_animation"   # // = next to .blend file
ISLAND_SCALE     = 7.0          # radius of island in Blender units
SUN_ELEVATION    = 28           # degrees — golden hour feel
CAMERA_HEIGHT    = 9.0
CAMERA_DISTANCE  = 20.0
CAMERA_TILT      = 52           # degrees down from horizontal
OCEAN_WAVE_SCALE = 0.18         # amplitude of ocean waves

# Villa data matching IslandMap.jsx (x,y as 0–100 percentage of SVG viewport)
VILLAS = [
    {"name": "Concierge",   "x": 68, "y": 72, "color": (0.98, 0.62, 0.07)},
    {"name": "MoodDiary",   "x": 32, "y": 72, "color": (0.55, 0.36, 0.98)},
    {"name": "Mindfulness", "x": 18, "y": 55, "color": (0.06, 0.73, 0.51)},
    {"name": "Relaxation",  "x": 72, "y": 55, "color": (0.02, 0.71, 0.84)},
    {"name": "Wellness",    "x": 78, "y": 38, "color": (0.96, 0.25, 0.37)},
    {"name": "Inspiration", "x": 22, "y": 38, "color": (0.98, 0.45, 0.09)},
    {"name": "AICompanion", "x": 50, "y": 18, "color": (0.39, 0.40, 0.95)},
]

PALM_SEEDS = [
    (1.8, -1.6, 0), (-1.8, -1.6, 0),
    (2.2,  0.6, 0), (-2.2,  0.6, 0),
    (0.5,  2.8, 0), (-0.5,  2.8, 0),
    (0.0, -3.2, 0),
]


# ─────────────────────────────────────────────────────────────────────────────
# UTILITIES
# ─────────────────────────────────────────────────────────────────────────────

def clear_scene():
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete(use_global=False)
    for block in bpy.data.meshes:      bpy.data.meshes.remove(block)
    for block in bpy.data.materials:   bpy.data.materials.remove(block)
    for block in bpy.data.curves:      bpy.data.curves.remove(block)
    for block in bpy.data.lights:      bpy.data.lights.remove(block)
    for block in bpy.data.cameras:     bpy.data.cameras.remove(block)
    for block in bpy.data.textures:    bpy.data.textures.remove(block)


def mat(name, base_color, roughness=0.85, metallic=0.0,
        specular=0.5, transmission=0.0):
    """Create a simple Principled BSDF material."""
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    nodes = m.node_tree.nodes
    nodes.clear()

    out  = nodes.new('ShaderNodeOutputMaterial')
    bsdf = nodes.new('ShaderNodeBsdfPrincipled')
    bsdf.inputs['Base Color'].default_value      = (*base_color, 1.0)
    bsdf.inputs['Roughness'].default_value       = roughness
    bsdf.inputs['Metallic'].default_value        = metallic
    bsdf.inputs['Transmission Weight'].default_value = transmission

    m.node_tree.links.new(bsdf.outputs['BSDF'], out.inputs['Surface'])
    return m


def svg_to_3d(svg_x, svg_y, scale=ISLAND_SCALE * 1.6):
    """Map SVG 0–100 coordinates to 3D island space."""
    x3 =  (svg_x - 50) / 100 * scale
    y3 = -(svg_y - 50) / 100 * scale
    return x3, y3


# ─────────────────────────────────────────────────────────────────────────────
# SCENE SETUP
# ─────────────────────────────────────────────────────────────────────────────

def setup_render():
    scene = bpy.context.scene
    scene.render.engine            = 'CYCLES'
    scene.cycles.samples           = RENDER_SAMPLES
    scene.cycles.use_denoising     = True
    scene.render.resolution_x      = RENDER_WIDTH
    scene.render.resolution_y      = RENDER_HEIGHT
    scene.render.fps               = 30
    scene.frame_start              = 1
    scene.frame_end                = TOTAL_FRAMES
    scene.render.image_settings.file_format = 'FFMPEG'
    scene.render.ffmpeg.format     = 'MPEG4'
    scene.render.ffmpeg.codec      = 'H264'
    scene.render.ffmpeg.constant_rate_factor = 'MEDIUM'
    scene.render.filepath          = OUTPUT_FILENAME

    # Try to enable GPU if available
    prefs = bpy.context.preferences.addons.get('cycles')
    if prefs:
        scene.cycles.device = 'GPU'


def setup_sky():
    world = bpy.data.worlds.new("IslandSky")
    bpy.context.scene.world = world
    world.use_nodes = True
    nt = world.node_tree
    nt.nodes.clear()

    out = nt.nodes.new('ShaderNodeOutputWorld')
    bg  = nt.nodes.new('ShaderNodeBackground')
    sky = nt.nodes.new('ShaderNodeTexSky')

    sky.sky_type      = 'NISHITA'
    sky.sun_elevation = math.radians(SUN_ELEVATION)
    sky.sun_rotation  = math.radians(55)
    sky.air_density   = 1.0
    sky.dust_density  = 0.5
    sky.ozone_density = 1.0
    bg.inputs['Strength'].default_value = 1.8

    nt.links.new(sky.outputs['Color'], bg.inputs['Color'])
    nt.links.new(bg.outputs['Background'], out.inputs['Surface'])


def setup_lighting():
    # Key sun
    bpy.ops.object.light_add(type='SUN', location=(8, -6, 14))
    sun = bpy.context.active_object
    sun.name = 'Sun'
    sun.data.energy = 4.0
    sun.data.color  = (1.0, 0.93, 0.78)   # warm golden
    sun.rotation_euler = (math.radians(45), math.radians(10), math.radians(50))

    # Soft fill from opposite side
    bpy.ops.object.light_add(type='SUN', location=(-8, 8, 10))
    fill = bpy.context.active_object
    fill.name = 'FillLight'
    fill.data.energy = 0.8
    fill.data.color  = (0.75, 0.88, 1.0)  # cool sky blue fill
    fill.rotation_euler = (math.radians(60), 0, math.radians(-130))


# ─────────────────────────────────────────────────────────────────────────────
# OCEAN
# ─────────────────────────────────────────────────────────────────────────────

def build_ocean():
    # Large flat plane
    bpy.ops.mesh.primitive_grid_add(x_subdivisions=80, y_subdivisions=80,
                                     size=80, location=(0, 0, -0.05))
    ocean = bpy.context.active_object
    ocean.name = 'Ocean'

    # Ocean modifier for realistic waves
    ocean_mod = ocean.modifiers.new('Ocean', 'OCEAN')
    ocean_mod.geometry_mode    = 'DISPLACE'
    ocean_mod.wave_scale       = OCEAN_WAVE_SCALE
    ocean_mod.wind_velocity    = 4.0
    ocean_mod.wave_alignment   = 0.8
    ocean_mod.choppiness       = 1.2
    ocean_mod.resolution       = 12
    ocean_mod.spatial_size     = 50
    ocean_mod.use_normals      = True

    # Animate the ocean time so waves move
    scene = bpy.context.scene
    ocean_mod.time = 0.0
    ocean_mod.keyframe_insert(data_path='time', frame=1)
    ocean_mod.time = 4.0
    ocean_mod.keyframe_insert(data_path='time', frame=TOTAL_FRAMES)

    # Make animation linear so it loops cleanly
    if ocean.animation_data and ocean.animation_data.action:
        for fc in ocean.animation_data.action.fcurves:
            for kp in fc.keyframe_points:
                kp.interpolation = 'LINEAR'

    # Material — deep transparent ocean blue
    ocean_mat = bpy.data.materials.new('OceanMat')
    ocean_mat.use_nodes = True
    nt = ocean_mat.node_tree
    nt.nodes.clear()

    out_node  = nt.nodes.new('ShaderNodeOutputMaterial')
    principled = nt.nodes.new('ShaderNodeBsdfPrincipled')

    principled.inputs['Base Color'].default_value          = (0.01, 0.22, 0.52, 1.0)
    principled.inputs['Roughness'].default_value           = 0.04
    principled.inputs['Metallic'].default_value            = 0.0
    principled.inputs['Transmission Weight'].default_value = 0.3
    principled.inputs['IOR'].default_value                 = 1.33
    # Subsurface for light scattering in water
    principled.inputs['Subsurface Weight'].default_value   = 0.15
    principled.inputs['Subsurface Color'].default_value    = (0.05, 0.45, 0.7, 1.0)
    principled.inputs['Subsurface Radius'].default_value   = (0.5, 0.5, 0.5)

    nt.links.new(principled.outputs['BSDF'], out_node.inputs['Surface'])
    ocean.data.materials.append(ocean_mat)

    return ocean


# ─────────────────────────────────────────────────────────────────────────────
# ISLAND TERRAIN
# ─────────────────────────────────────────────────────────────────────────────

def build_island():
    # Start from a UV sphere, flatten it into an island dome
    bpy.ops.mesh.primitive_uv_sphere_add(
        radius=ISLAND_SCALE, location=(0, 0, 0),
        segments=64, ring_count=32
    )
    island = bpy.context.active_object
    island.name = 'IslandTerrain'
    island.scale.z = 0.2   # flatten

    bpy.ops.object.mode_set(mode='EDIT')
    bm = bmesh.from_edit_mesh(island.data)

    # Delete lower hemisphere (keep only cap)
    verts_to_del = [v for v in bm.verts if v.co.z < -0.01]
    bmesh.ops.delete(bm, geom=verts_to_del, context='VERTS')

    # Slightly randomise vertex heights for natural terrain
    rng = random.Random(42)
    for v in bm.verts:
        dist = math.sqrt(v.co.x**2 + v.co.y**2) / ISLAND_SCALE
        if dist < 0.85:
            v.co.z += rng.uniform(-0.08, 0.12) * (1.0 - dist)

    bmesh.update_edit_mesh(island.data)
    bpy.ops.object.mode_set(mode='OBJECT')

    # Apply scale
    bpy.ops.object.transform_apply(scale=True)

    # Smooth modifier
    smooth = island.modifiers.new('Smooth', 'SMOOTH')
    smooth.factor     = 0.8
    smooth.iterations = 6

    # Displace for micro-terrain variation
    disp_tex = bpy.data.textures.new('TerrainNoise', 'CLOUDS')
    disp_tex.noise_scale  = 1.2
    disp_tex.noise_depth  = 5
    disp_tex.nabla        = 0.03
    disp = island.modifiers.new('Displace', 'DISPLACE')
    disp.texture   = disp_tex
    disp.strength  = 0.25
    disp.mid_level = 0.5

    # Grass material with subtle variation
    island_mat = bpy.data.materials.new('GrassMat')
    island_mat.use_nodes = True
    nt = island_mat.node_tree
    nt.nodes.clear()

    out_n = nt.nodes.new('ShaderNodeOutputMaterial')
    bsdf  = nt.nodes.new('ShaderNodeBsdfPrincipled')
    noise = nt.nodes.new('ShaderNodeTexNoise')
    cramp = nt.nodes.new('ShaderNodeValToRGB')
    coord = nt.nodes.new('ShaderNodeTexCoord')

    noise.inputs['Scale'].default_value  = 4.0
    noise.inputs['Detail'].default_value = 8.0
    noise.inputs['Roughness'].default_value = 0.6

    # Two shades of tropical green
    cramp.color_ramp.elements[0].position = 0.3
    cramp.color_ramp.elements[0].color    = (0.10, 0.38, 0.14, 1.0)
    cramp.color_ramp.elements[1].position = 0.7
    cramp.color_ramp.elements[1].color    = (0.20, 0.55, 0.22, 1.0)

    bsdf.inputs['Roughness'].default_value = 0.9

    nt.links.new(coord.outputs['Object'], noise.inputs['Vector'])
    nt.links.new(noise.outputs['Fac'],    cramp.inputs['Fac'])
    nt.links.new(cramp.outputs['Color'],  bsdf.inputs['Base Color'])
    nt.links.new(bsdf.outputs['BSDF'],    out_n.inputs['Surface'])

    island.data.materials.append(island_mat)
    return island


def build_beach():
    """Sandy beach ring around the base of the island."""
    bpy.ops.mesh.primitive_torus_add(
        major_radius=ISLAND_SCALE * 0.98,
        minor_radius=ISLAND_SCALE * 0.18,
        major_segments=80,
        minor_segments=16,
        location=(0, 0, 0.05)
    )
    beach = bpy.context.active_object
    beach.name = 'Beach'
    beach.scale.z = 0.06

    beach_mat = mat('SandMat', (0.82, 0.72, 0.50), roughness=0.95)
    beach.data.materials.append(beach_mat)
    return beach


# ─────────────────────────────────────────────────────────────────────────────
# VILLA BUILDINGS
# ─────────────────────────────────────────────────────────────────────────────

def build_villa(name, svg_x, svg_y, roof_color):
    x3, y3 = svg_to_3d(svg_x, svg_y)
    z_base = 0.38   # sit on top of island

    group_objs = []

    # ── Body ──────────────────────────────────────────────────────────────
    bpy.ops.mesh.primitive_cube_add(size=1.0, location=(x3, y3, z_base + 0.3))
    body = bpy.context.active_object
    body.name = f'{name}_body'
    body.scale = (0.55, 0.55, 0.45)
    bpy.ops.object.transform_apply(scale=True)
    body.data.materials.append(mat(f'{name}_body_mat',
                                   (0.95, 0.92, 0.85), roughness=0.88))
    group_objs.append(body)

    # ── Roof ──────────────────────────────────────────────────────────────
    bpy.ops.mesh.primitive_cone_add(
        vertices=4, radius1=0.62, radius2=0.0, depth=0.55,
        location=(x3, y3, z_base + 0.80)
    )
    roof = bpy.context.active_object
    roof.name = f'{name}_roof'
    roof.rotation_euler.z = math.pi / 4
    roof.data.materials.append(mat(f'{name}_roof_mat', roof_color, roughness=0.65))
    group_objs.append(roof)

    # ── Chimney ───────────────────────────────────────────────────────────
    bpy.ops.mesh.primitive_cylinder_add(
        radius=0.055, depth=0.28,
        location=(x3 + 0.22, y3 - 0.18, z_base + 1.02)
    )
    chimney = bpy.context.active_object
    chimney.name = f'{name}_chimney'
    chimney.data.materials.append(mat(f'{name}_brick_mat',
                                      (0.55, 0.32, 0.12), roughness=0.92))
    group_objs.append(chimney)

    # ── Door ──────────────────────────────────────────────────────────────
    bpy.ops.mesh.primitive_cube_add(size=1, location=(x3, y3 - 0.28, z_base + 0.22))
    door = bpy.context.active_object
    door.name = f'{name}_door'
    door.scale = (0.10, 0.01, 0.18)
    door.data.materials.append(mat(f'{name}_door_mat',
                                   (0.40, 0.22, 0.06), roughness=0.85))
    group_objs.append(door)

    # ── Windows ───────────────────────────────────────────────────────────
    for wx, wy in [(-0.18, -0.28), (0.18, -0.28)]:
        bpy.ops.mesh.primitive_cube_add(
            size=1, location=(x3 + wx, y3 + wy, z_base + 0.38)
        )
        win = bpy.context.active_object
        win.name = f'{name}_window'
        win.scale = (0.09, 0.01, 0.10)
        win.data.materials.append(
            mat(f'{name}_glass', (0.65, 0.82, 0.95),
                roughness=0.05, metallic=0.0, transmission=0.8)
        )
        group_objs.append(win)

    # ── Soft glow light above each villa ──────────────────────────────────
    bpy.ops.object.light_add(type='POINT',
                              location=(x3, y3, z_base + 1.5))
    glow = bpy.context.active_object
    glow.name = f'{name}_glow'
    glow.data.energy = 3.0
    glow.data.color  = (*roof_color, 1.0)
    glow.data.shadow_soft_size = 0.5
    group_objs.append(glow)

    return group_objs


# ─────────────────────────────────────────────────────────────────────────────
# PALM TREES
# ─────────────────────────────────────────────────────────────────────────────

def build_palm(base_x, base_y, base_z=0.42, height=2.2, seed=0):
    rng = random.Random(seed * 137)
    lean_x = rng.uniform(-0.25, 0.25)
    lean_y = rng.uniform(-0.25, 0.25)
    top_x  = base_x + lean_x
    top_y  = base_y + lean_y
    top_z  = base_z + height

    trunk_mat = mat(f'Trunk_{seed}', (0.38, 0.24, 0.07), roughness=0.95)
    leaf_mat  = mat(f'Leaf_{seed}',  (0.10, 0.50, 0.18), roughness=0.80)
    coco_mat  = mat(f'Coco_{seed}',  (0.28, 0.16, 0.04), roughness=0.92)

    # Trunk: stack of slightly tapered cylinders
    segs = 6
    for i in range(segs):
        t = i / segs
        cx = base_x + lean_x * t
        cy = base_y + lean_y * t
        cz = base_z + height * (t + 0.5 / segs)
        r  = 0.10 - t * 0.04

        bpy.ops.mesh.primitive_cylinder_add(
            radius=r, depth=height / segs + 0.05,
            location=(cx, cy, cz)
        )
        seg = bpy.context.active_object
        seg.name = f'Palm{seed}_trunk_{i}'
        # Tilt cylinder toward lean
        seg.rotation_euler.x = math.atan2(lean_y, height) * 0.8
        seg.rotation_euler.y = -math.atan2(lean_x, height) * 0.8
        seg.data.materials.append(trunk_mat)

    # Fronds (6 leaves radiating from top)
    for i in range(6):
        angle = (i / 6) * 2 * math.pi + rng.uniform(-0.2, 0.2)
        length = rng.uniform(1.0, 1.4)
        droop  = rng.uniform(0.28, 0.42)

        bpy.ops.mesh.primitive_plane_add(size=1, location=(
            top_x + math.cos(angle) * length * 0.5,
            top_y + math.sin(angle) * length * 0.5,
            top_z - droop * 0.5
        ))
        leaf = bpy.context.active_object
        leaf.name = f'Palm{seed}_leaf_{i}'
        leaf.scale = (0.12, length, 1.0)
        leaf.rotation_euler.z = angle + math.pi / 2
        leaf.rotation_euler.x = math.radians(-35) - droop
        leaf.data.materials.append(leaf_mat)

    # Coconuts
    for i in range(3):
        a  = (i / 3) * 2 * math.pi
        bpy.ops.mesh.primitive_uv_sphere_add(
            radius=0.09, location=(
                top_x + math.cos(a) * 0.18,
                top_y + math.sin(a) * 0.18,
                top_z - 0.15
            )
        )
        coco = bpy.context.active_object
        coco.name  = f'Palm{seed}_coco_{i}'
        coco.data.materials.append(coco_mat)


# ─────────────────────────────────────────────────────────────────────────────
# DECORATIVE DETAILS
# ─────────────────────────────────────────────────────────────────────────────

def build_details():
    rng = random.Random(99)
    flower_colors = [
        (1.0, 0.42, 0.62), (1.0, 0.62, 0.29), (0.75, 0.48, 0.98),
        (0.20, 0.82, 0.56), (1.0, 0.90, 0.25), (0.42, 0.72, 1.0),
    ]

    # Scatter flowers on the island surface
    for i in range(24):
        angle  = rng.uniform(0, 2 * math.pi)
        radius = rng.uniform(0.6, ISLAND_SCALE * 0.7)
        fx = math.cos(angle) * radius
        fy = math.sin(angle) * radius
        fz = 0.50 + rng.uniform(0, 0.1)
        color = rng.choice(flower_colors)

        # Petals
        for j in range(4):
            pa = (j / 4) * 2 * math.pi
            bpy.ops.mesh.primitive_uv_sphere_add(
                radius=0.06,
                location=(fx + math.cos(pa) * 0.09,
                           fy + math.sin(pa) * 0.09,
                           fz)
            )
            petal = bpy.context.active_object
            petal.name = f'Flower{i}_petal{j}'
            petal.data.materials.append(
                mat(f'PetalMat{i}_{j}', color, roughness=0.7)
            )
        # Centre
        bpy.ops.mesh.primitive_uv_sphere_add(radius=0.045,
                                              location=(fx, fy, fz + 0.04))
        centre = bpy.context.active_object
        centre.name = f'Flower{i}_centre'
        centre.data.materials.append(mat(f'CentreMat{i}', (1.0, 0.92, 0.2), roughness=0.6))

    # Rocks scattered around edge
    rock_mat = mat('RockMat', (0.55, 0.53, 0.48), roughness=0.95)
    for i in range(10):
        angle  = rng.uniform(0, 2 * math.pi)
        radius = rng.uniform(ISLAND_SCALE * 0.7, ISLAND_SCALE * 0.88)
        bpy.ops.mesh.primitive_ico_sphere_add(
            subdivisions=1, radius=rng.uniform(0.08, 0.18),
            location=(math.cos(angle) * radius,
                       math.sin(angle) * radius,
                       0.25 + rng.uniform(0, 0.1))
        )
        rock = bpy.context.active_object
        rock.name = f'Rock_{i}'
        rock.rotation_euler = (rng.uniform(0, math.pi),
                                rng.uniform(0, math.pi),
                                rng.uniform(0, math.pi))
        rock.scale = (rng.uniform(0.7, 1.3),
                       rng.uniform(0.7, 1.3),
                       rng.uniform(0.4, 0.8))
        rock.data.materials.append(rock_mat)


# ─────────────────────────────────────────────────────────────────────────────
# CAMERA
# ─────────────────────────────────────────────────────────────────────────────

def build_camera():
    # Empty at island centre — camera orbits around this
    bpy.ops.object.empty_add(type='PLAIN_AXES', location=(0, 0, 1.5))
    pivot = bpy.context.active_object
    pivot.name = 'CameraOrbitPivot'

    # Add camera parented to the pivot
    bpy.ops.object.camera_add(location=(0, -CAMERA_DISTANCE, CAMERA_HEIGHT))
    cam = bpy.context.active_object
    cam.name = 'IslandCamera'
    cam.data.lens         = 48
    cam.data.clip_start   = 0.1
    cam.data.clip_end     = 200
    cam.rotation_euler    = (math.radians(CAMERA_TILT), 0, 0)

    # Depth of field — focus on island centre
    cam.data.dof.use_dof        = True
    cam.data.dof.focus_object   = pivot
    cam.data.dof.aperture_fstop = 6.3   # soft but not extreme blur

    # Parent camera to pivot
    cam.parent = pivot

    # Animate pivot for smooth orbit — one full rotation over TOTAL_FRAMES
    pivot.rotation_euler = (0, 0, 0)
    pivot.keyframe_insert(data_path='rotation_euler', frame=1)
    pivot.rotation_euler = (0, 0, math.radians(360))
    pivot.keyframe_insert(data_path='rotation_euler', frame=TOTAL_FRAMES + 1)

    # Linear interpolation so orbit speed is constant (seamless loop)
    if pivot.animation_data and pivot.animation_data.action:
        for fc in pivot.animation_data.action.fcurves:
            fc.extrapolation = 'LINEAR'
            for kp in fc.keyframe_points:
                kp.interpolation = 'LINEAR'

    bpy.context.scene.camera = cam
    return cam, pivot


# ─────────────────────────────────────────────────────────────────────────────
# MAIN
# ─────────────────────────────────────────────────────────────────────────────

def build_scene():
    print("\n=== Recovery Island — Building 3D Scene ===\n")

    clear_scene()
    print("✓  Scene cleared")

    setup_render()
    print("✓  Render settings applied")

    setup_sky()
    print("✓  Sky shader created")

    setup_lighting()
    print("✓  Lights added")

    build_ocean()
    print("✓  Animated ocean built")

    build_island()
    print("✓  Island terrain built")

    build_beach()
    print("✓  Sandy beach added")

    for v in VILLAS:
        build_villa(v["name"], v["x"], v["y"], v["color"])
    print(f"✓  {len(VILLAS)} villa buildings placed")

    for i, (px, py, pz) in enumerate(PALM_SEEDS):
        build_palm(px, py, pz + 0.42, height=1.9 + (i % 3) * 0.25, seed=i)
    print(f"✓  {len(PALM_SEEDS)} palm trees planted")

    build_details()
    print("✓  Flowers and rocks scattered")

    cam, pivot = build_camera()
    print("✓  Orbiting camera set up")

    # Select camera for viewport
    bpy.ops.object.select_all(action='DESELECT')
    cam.select_set(True)
    bpy.context.view_layer.objects.active = cam

    print(f"""
=== Scene Ready ===

  Objects created : {len(bpy.data.objects)}
  Total frames    : {TOTAL_FRAMES} ({TOTAL_FRAMES // 30}s @ 30fps)
  Output          : {bpy.context.scene.render.filepath}.mp4

  Next steps:
  1. Press Numpad 0 to see the camera view
  2. Press Numpad 5 to toggle perspective
  3. Press Ctrl+F12 to render the full animation
     (or F12 for a single frame preview)

  Tip: lower RENDER_SAMPLES to 64 at the top of the script
  for a faster preview render.
""")


# Run it
build_scene()
