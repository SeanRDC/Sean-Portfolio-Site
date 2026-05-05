// js/project-loader.js
document.addEventListener("DOMContentLoaded", () => {
    // 1. Get the project ID from the URL (e.g., project.html?id=beaded)
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');

    // 2. Fetch the data from our database
    const project = projectsDatabase[projectId];

    if (project) {
        // --- TEXT DATA ---
        document.getElementById('page-title').textContent = `${project.title} - Sean`;
        document.getElementById('hero-title').textContent = project.title;
        document.getElementById('hero-subtitle').textContent = project.subtitle;
        document.getElementById('meta-role').textContent = project.role;
        document.getElementById('meta-year').textContent = project.year;
        document.getElementById('meta-platform').textContent = project.platform;
        document.getElementById('overview-content').innerHTML = project.overviewHtml;

        // --- IMAGES ---
        const imageGrid = document.getElementById('image-grid');
        project.images.forEach(imgSrc => {
            const imgHtml = `
                <div class="showcase-item">
                    <div class="showcase-placeholder">
                        <img src="${imgSrc}" alt="${project.title} showcase" class="zoomable">
                    </div>
                </div>
            `;
            imageGrid.insertAdjacentHTML('beforeend', imgHtml);
        });

        // --- LINKS (Primary vs Secondary SVG handling) ---
        const linksContainer = document.getElementById('project-links-container');
        project.links.forEach(link => {
            const isPrimary = link.type === 'primary';
            const cssClass = isPrimary ? 'project-link-btn' : 'project-link-btn secondary';
            const svgIcon = isPrimary 
                ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M9 9h12M9 15h12"/></svg>`
                : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`;
            
            const linkHtml = `
                <a href="${link.url}" class="${cssClass}" target="_blank" rel="noopener noreferrer">
                    ${svgIcon}
                    ${link.text}
                </a>
            `;
            linksContainer.insertAdjacentHTML('beforeend', linkHtml);
        });

        // --- DETAILS GRID (Lists + Goals) ---
        const detailsGrid = document.getElementById('details-grid');
        
        // Inject Lists
        project.detailBlocks.forEach(block => {
            let listItems = block.items.map(item => `<li>${item}</li>`).join('');
            const blockHtml = `
                <div class="detail-block">
                    <h4>${block.title}</h4>
                    <ul>${listItems}</ul>
                </div>
            `;
            detailsGrid.insertAdjacentHTML('beforeend', blockHtml);
        });

        // Inject Goals
        if (project.goalsHtml) {
            detailsGrid.insertAdjacentHTML('beforeend', project.goalsHtml);
        }

        // --- KEY ACHIEVEMENTS ---
        if (project.achievementsHtml) {
            document.getElementById('achievements-container').innerHTML = project.achievementsHtml;
        }

    } else {
        // Fallback if the user types a broken URL
        document.getElementById('hero-title').textContent = "Project Not Found";
        document.getElementById('hero-subtitle').textContent = "Return to the Work page to select a valid project.";
    }
});