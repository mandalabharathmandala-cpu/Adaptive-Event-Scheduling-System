# 🎨 Visual Design Guide - Sign-In/Sign-Up System

## Color Palette

```
Primary Blue:     #063da2  ████████████ (Dark Blue)
Light Blue:       #0493e0  ████████████ (Sky Blue)
White:            #ffffff  ████████████
Dark Gray:        #333333  ████████████
Light Gray:       #999999  ████████████
Border Gray:      #e5e7eb  ████████████
```

## Modal Design Features

### Modal Window
- **Background**: White (#ffffff)
- **Border Radius**: 16px (modern rounded corners)
- **Shadow**: 0 20px 60px rgba(0, 0, 0, 0.3) (depth effect)
- **Animation**: Slide down from top + fade in
- **Max Width**: 420px (mobile friendly)
- **Padding**: 40px 35px (spacious)

### Form Elements

#### Input Fields
- **Background**: White
- **Border**: 2px solid #e5e7eb (default)
- **Border (Focus)**: 2px solid #063da2 (blue on focus)
- **Box Shadow (Focus)**: 0 0 0 3px rgba(6, 61, 162, 0.1)
- **Padding**: 12px 15px
- **Border Radius**: 8px
- **Transition**: 0.3s smooth

#### Buttons

##### Primary Button
```css
Background: linear-gradient(135deg, #063da2, #0493e0)
Color: White
Padding: 12px 20px
Border Radius: 8px
Font Weight: 600
Hover Effect: scale(1.05) + box-shadow
```

##### Secondary Button
```css
Background: White
Color: #063da2
Border: 2px solid #063da2
Hover Effect: bg-color: #f0f4ff
```

## Animation Keyframes

### Fade In
```css
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}
Duration: 0.3s ease
```

### Slide Down
```css
@keyframes slideDown {
    from {
        transform: translateY(-50px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}
Duration: 0.3s ease
```

## Button Hover States

### All Buttons
- **Scale**: 1.05 (5% size increase)
- **Shadow**: Add box-shadow for depth
- **Transition**: All 0.3s ease
- **Cursor**: pointer

## Form Layout

### Sign-In Form
```
┌─────────────────────────────┐
│         Sign In             │
├─────────────────────────────┤
│ [Email Input Field        ] │
│ [Password Input Field     ] │
│ [Sign In Button           ] │
│ Don't have account? Sign Up │
└─────────────────────────────┘
```

### Sign-Up Form
```
┌─────────────────────────────┐
│      Create Account         │
├─────────────────────────────┤
│ [Full Name Field          ] │
│ [Email Field              ] │
│ [Password Field           ] │
│ [Confirm Password Field   ] │
│ [Phone Number Field       ] │
│ [Sign Up Button           ] │
│ Have account? Sign In       │
└─────────────────────────────┘
```

## Header Design

### Navigation Bar
- **Background**: rgba(255, 255, 255, 0.15) with backdrop-filter blur
- **Display**: Flex with space-between
- **Padding**: 15px 40px
- **Height**: Auto

### Header Buttons
```css
Background: white or rgba(255, 255, 255, 0.3)
Color: Blue or white
Padding: 10px 22px
Border Radius: 20px (pill-shaped)
Font Weight: bold
Hover: scale(1.05)
```

## Card Design

### Event Card
- **Background**: White
- **Border Radius**: 18px
- **Shadow**: 0 12px 25px rgba(0,0,0,0.08)
- **Hover**: Transform up 10px + stronger shadow
- **Transition**: 0.3s smooth

### Stats Box
- **Background**: rgba(255,255,255,0.18)
- **Width**: 170px
- **Padding**: 30px 15px
- **Border Radius**: 15px
- **Hover**: translateY(-8px)

## Responsive Breakpoints

### Mobile (≤768px)
- Modal margin: 30% auto
- Modal width: 95%
- Stack buttons vertically
- Full-width inputs
- Single column form layout

### Tablet (769px-1024px)
- Modal centered normally
- 2-column layouts

### Desktop (>1024px)
- Modal centered at 10% top
- Multi-column layouts
- Full width backgrounds

## Backdrop Styling

### Modal Backdrop
- **Color**: rgba(0, 0, 0, 0.6)
- **Effect**: Semi-transparent dark overlay
- **Z-Index**: 1000 (above all content)
- **Position**: Fixed (full viewport)

### Glassmorphism (Admin Page)
- **Background**: rgba(255, 255, 255, 0.1)
- **Backdrop-filter**: blur(10px)
- **Border**: Optional subtle border
- **Shadow**: Soft shadow for depth

## Typography

### Heading (h2)
- **Font Size**: 1.8rem (28px)
- **Color**: #063da2
- **Text Align**: Center
- **Margin Bottom**: 30px

### Form Label (placeholder)
- **Color**: #9ca3af (light gray)
- **Font Size**: 0.95rem

### Link Text
- **Color**: #063da2
- **Font Weight**: 600
- **Text Decoration**: None (underline on hover)
- **Cursor**: pointer

## Transition Effects

All transitions use:
- **Duration**: 0.3s
- **Timing**: ease or ease-out
- **Properties**: transform, box-shadow, background-color, border-color

## Special Effects

### Focus Glow
```css
outline: none;
box-shadow: 0 0 0 3px rgba(6, 61, 162, 0.1);
```

### Smooth Hover Scale
```css
transform: scale(1.05);
box-shadow: 0 8px 20px rgba(6, 61, 162, 0.4);
```

### Slide Down Animation
```css
transform: translateY(-50px) → translateY(0);
opacity: 0 → 1;
```

---

This design system creates a modern, attractive, and user-friendly authentication experience! 🎨✨
