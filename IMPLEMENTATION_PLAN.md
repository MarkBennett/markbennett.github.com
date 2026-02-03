# Implementation Plan: Migrate markbennett.ca to Astro

## Overview
This document outlines the plan to migrate the existing Jekyll-based personal website (markbennett.ca) to a modern Astro-based static site while preserving all content, blog posts, and important artifacts.

## Current Site Analysis

### Technology Stack
- **Current**: Jekyll static site generator
- **Target**: Astro static site generator

### Content Inventory
1. **Blog Posts** (3 posts in `_posts/`):
   - 2012-05-16: Joining Yardstick
   - 2014-02-24: Looking back on the flight
   - 2017-09-13: Adding Spree with custom user

2. **Main Content**:
   - Index page with projects & talks
   - Links to presentations and projects
   - Latest blog post display

3. **Static Assets**:
   - Images folder (profile photos, project images)
   - JavaScript files
   - Stylesheets
   - Special files: keybase.txt, humans.txt, robots.txt, CNAME, vote2025.html

4. **Layouts**:
   - default.html layout

## Migration Strategy

### Phase 1: Setup & Theme Selection
1. Research professional Astro themes suitable for personal/developer websites
2. Evaluate themes based on:
   - Blog support
   - Modern, clean design
   - Good documentation
   - Active maintenance
   - SEO capabilities
3. Select and install chosen theme
4. Initialize Astro project structure

### Phase 2: Content Migration
1. **Blog Posts**:
   - Convert Jekyll markdown frontmatter to Astro format
   - Preserve dates and titles
   - Maintain markdown content
   - Test rendering

2. **Static Pages**:
   - Migrate index.html content to Astro components
   - Convert projects & talks section
   - Preserve all external links

3. **Static Assets**:
   - Move images to Astro public folder
   - Migrate JavaScript files (if still needed)
   - Port CSS/stylesheets to theme or custom styles
   - Copy important files (keybase.txt, humans.txt, robots.txt, CNAME, vote2025.html)

### Phase 3: URL Preservation
1. **Analysis**:
   - Document current URL structure
   - Jekyll default: `/YYYY/MM/DD/title.html`
   - Root level pages preserved as-is

2. **Implementation**:
   - Configure Astro to match Jekyll URL patterns where possible
   - Create redirect rules for any URLs that must change
   - Use Astro's file-based routing
   - Add redirect middleware or _redirects file if needed

### Phase 4: Design & Layout
1. Apply selected theme
2. Customize theme colors/branding if needed
3. Ensure responsive design works well
4. Test navigation and layout on multiple devices

### Phase 5: Build & Deployment Configuration
1. Configure Astro build output for GitHub Pages
2. Set up build command
3. Configure base URL and site settings
4. Test local build
5. Set up GitHub Actions workflow for automated deployment (if needed)

### Phase 6: Testing & Validation
1. **Functional Testing**:
   - Verify all pages render correctly
   - Test all internal and external links
   - Verify blog post display
   - Check static asset loading
   - Validate special files are accessible

2. **URL Testing**:
   - Test old URLs redirect properly
   - Verify canonical URLs are correct
   - Check CNAME configuration

3. **Cross-browser Testing**:
   - Test on major browsers
   - Verify mobile responsiveness

### Phase 7: Deployment
1. Deploy to staging branch first
2. Review deployed site
3. Fix any issues found
4. Deploy to production (merge to master)
5. Verify live site at markbennett.ca

## Technical Considerations

### Astro Theme Candidates
Some recommended themes to evaluate:
- **Astro Starter Blog**: Official blog template
- **AstroPaper**: Popular blog theme with good typography
- **Astro Cactus**: Clean, minimal blog theme
- **Astro Portfolio**: For showcasing projects and writing

### Dependencies
- Node.js and npm (for Astro)
- Astro CLI
- Selected theme dependencies

### Configuration Files Needed
- `astro.config.mjs` - Main Astro configuration
- `package.json` - Dependencies
- `tsconfig.json` - TypeScript configuration (if using TypeScript)
- `.gitignore` - Updated for Node/Astro

### URL Mapping Strategy
```
Jekyll → Astro
/YYYY/MM/DD/title.html → /blog/YYYY-MM-DD-title/ or /YYYY/MM/DD/title/
/index.html → /
/vote2025.html → /vote2025/ (or keep as .html)
```

## Rollback Plan
- Maintain Jekyll site on master branch until migration is complete
- Work on feature branch
- Can revert PR if issues arise
- Keep old site files in archive folder initially

## Success Criteria
✓ All blog posts migrated and rendering correctly
✓ All static assets accessible
✓ Old URLs redirect to new URLs (or URLs preserved)
✓ Site builds successfully
✓ Site deploys to markbennett.ca
✓ Mobile responsive design
✓ All external links work
✓ Special files (keybase.txt, robots.txt, etc.) accessible
✓ Site performance equal or better than Jekyll version

## Timeline Estimate
- Phase 1: 1-2 hours (theme selection and setup)
- Phase 2: 2-3 hours (content migration)
- Phase 3: 1-2 hours (URL preservation)
- Phase 4: 1-2 hours (design tweaks)
- Phase 5: 1 hour (build configuration)
- Phase 6: 1-2 hours (testing)
- Phase 7: 1 hour (deployment)

**Total Estimated Time**: 8-13 hours

## Next Steps
1. Review and approve this plan
2. Begin Phase 1: Theme selection and Astro setup
3. Proceed iteratively through each phase
4. Report progress regularly

---
*Plan created: 2026-02-03*
*Author: GitHub Copilot*
