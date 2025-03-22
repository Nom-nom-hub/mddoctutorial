document.addEventListener('DOMContentLoaded', function() {
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
