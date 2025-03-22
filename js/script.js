// Remove any conflicting JavaScript for the button
document.addEventListener('DOMContentLoaded', function() {
    // Clear any existing handlers that might interfere
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        const newButton = ctaButton.cloneNode(true);
        ctaButton.parentNode.replaceChild(newButton, ctaButton);
    }
    
    const markdownInput = document.getElementById('markdown-input');
    const markdownOutput = document.getElementById('markdown-output');
    
    // Set initial content
    markdownInput.value = `# Welcome to Breeze3's Markdown Guide!

## You can:
- Write **bold** and *italic* text
- Create [links](https://example.com)
- Add images ![alt text](https://via.placeholder.com/150)

### Code blocks
\`\`\`javascript
function hello() {
  console.log("Hello, Breeze3!");
}
\`\`\`

> Markdown makes documentation easy and fun!
`;
    
    // Update preview function
    function updatePreview() {
        markdownOutput.innerHTML = marked.parse(markdownInput.value);
        // Highlight code blocks in the output
        Prism.highlightAllUnder(markdownOutput);
    }
    
    // Initial render
    updatePreview();
    
    // Update on input
    markdownInput.addEventListener('input', updatePreview);
    
    // Smooth scrolling for navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });
    
    // Mobile menu toggle functionality
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenu.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    // Check if we're on mobile and adjust the playground height
    function adjustPlaygroundHeight() {
        const isMobile = window.innerWidth <= 768;
        const markdownInput = document.getElementById('markdown-input');
        const markdownOutput = document.getElementById('markdown-output');
        
        if (isMobile) {
            markdownInput.style.height = '200px';
            markdownOutput.style.height = '300px';
        } else {
            markdownInput.style.height = '';
            markdownOutput.style.height = '';
        }
    }
    
    // Run on load and resize
    adjustPlaygroundHeight();
    window.addEventListener('resize', adjustPlaygroundHeight);
    
    // Fix Try It Now button and all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Try It Now button functionality
    const tryItNowBtn = document.getElementById('try-it-now-btn');
    if (tryItNowBtn) {
        tryItNowBtn.addEventListener('click', function() {
            const playground = document.getElementById('playground');
            if (playground) {
                const offsetTop = playground.getBoundingClientRect().top + window.pageYOffset - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Add cheatsheet download functionality
    const downloadBtn = document.getElementById('download-cheatsheet');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Cheatsheet download would start here. In a real implementation, this would download a PDF.');
            // In a real implementation, you would link to an actual PDF file
            // window.location.href = 'downloads/markdown-cheatsheet.pdf';
        });
    }
    
    // Add navigation link for new sections
    const navList = document.querySelector('nav ul');
    if (navList) {
        // Add cheatsheet link
        const cheatsheetLi = document.createElement('li');
        const cheatsheetLink = document.createElement('a');
        cheatsheetLink.href = '#cheatsheet';
        cheatsheetLink.innerHTML = '<i class="fas fa-file-alt"></i> Cheatsheet';
        cheatsheetLi.appendChild(cheatsheetLink);
        navList.appendChild(cheatsheetLi);
        
        // Add resources link
        const resourcesLi = document.createElement('li');
        const resourcesLink = document.createElement('a');
        resourcesLink.href = '#resources';
        resourcesLink.innerHTML = '<i class="fas fa-link"></i> Resources';
        resourcesLi.appendChild(resourcesLink);
        navList.appendChild(resourcesLi);
    }
});

// Configure marked to enable GitHub Flavored Markdown with dark mode code highlighting
marked.setOptions({
    gfm: true,
    breaks: true,
    headerIds: true,
    mangle: false,
    highlight: function(code, lang) {
        if (Prism.languages[lang]) {
            return Prism.highlight(code, Prism.languages[lang], lang);
        }
        return code;
    }
});

// Add custom renderer for task lists
const renderer = new marked.Renderer();
renderer.listitem = function(text, task, checked) {
    if (task) {
        return `<li><input type="checkbox" ${checked ? 'checked' : ''} disabled> ${text.substring(3)}</li>`;
    }
    return `<li>${text}</li>`;
};

marked.use({ renderer });
