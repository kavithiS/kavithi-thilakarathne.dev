// Loader: fetch the extracted process HTML and inject it
(function(){
    async function loadProcess() {
        try {
            const resp = await fetch('components/process.html');
            if (!resp.ok) return;
            const html = await resp.text();
            const root = document.getElementById('process-root');
            if (root) root.innerHTML = html;
            // initialize timeline after insertion
            initTimeline();
        } catch (e) {
            // silently fail
            console.error('Failed to load process component', e);
        }
    }

    // Color interpolation helper copied from original
    function interpolateColor(color1, color2, factor) {
        const hex = (c) => parseInt(c.slice(1), 16);
        const r1 = (hex(color1) >> 16) & 255;
        const g1 = (hex(color1) >> 8) & 255;
        const b1 = hex(color1) & 255;
        const r2 = (hex(color2) >> 16) & 255;
        const g2 = (hex(color2) >> 8) & 255;
        const b2 = hex(color2) & 255;
        const r = Math.round(r1 + factor * (r2 - r1));
        const g = Math.round(g1 + factor * (g2 - g1));
        const b = Math.round(b1 + factor * (b2 - b1));
        return `rgb(${r}, ${g}, ${b})`;
    }

    function animateTimelineLine() {
        const timelineContainer = document.querySelector('.timeline-container');
        const timelineProgress = document.getElementById('timelineProgress');
        if (!timelineContainer || !timelineProgress) return;
        const containerRect = timelineContainer.getBoundingClientRect();
        const containerTop = containerRect.top;
        const containerHeight = containerRect.height;
        const windowHeight = window.innerHeight;
        const scrollPoint = windowHeight * 0.5;
        let progress = 0;
        if (containerTop < scrollPoint) {
            const scrolled = scrollPoint - containerTop;
            progress = Math.min(scrolled / containerHeight, 1);
        }
        timelineProgress.style.height = (progress * 100) + '%';

        const colors = [
            { pos: 0, color: '#58a6ff' },
            { pos: 0.166, color: '#a371f7' },
            { pos: 0.333, color: '#d29922' },
            { pos: 0.5, color: '#39c5cf' },
            { pos: 0.666, color: '#ff7b92' },
            { pos: 0.833, color: '#3fb950' },
            { pos: 1, color: '#3fb950' }
        ];

        let tipColor = colors[0].color;
        for (let i = 0; i < colors.length - 1; i++) {
            if (progress >= colors[i].pos && progress <= colors[i + 1].pos) {
                const localProgress = (progress - colors[i].pos) / (colors[i + 1].pos - colors[i].pos);
                tipColor = interpolateColor(colors[i].color, colors[i + 1].color, localProgress);
                break;
            }
        }
        timelineProgress.style.setProperty('--tip-color', tipColor);
    }

    function revealOnScroll() {
        const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
        const windowHeight = window.innerHeight;
        const revealPoint = 120;
        reveals.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - revealPoint) element.classList.add('active');
        });
        const timelineDots = document.querySelectorAll('.timeline-dot');
        timelineDots.forEach(dot => {
            const dotTop = dot.getBoundingClientRect().top;
            if (dotTop < windowHeight - 120) dot.classList.add('active');
        });
    }

    function initTimeline() {
        // run once
        animateTimelineLine();
        revealOnScroll();
        window.addEventListener('scroll', animateTimelineLine);
        window.addEventListener('load', animateTimelineLine);
        window.addEventListener('resize', animateTimelineLine);
        window.addEventListener('scroll', revealOnScroll);
        window.addEventListener('load', revealOnScroll);
    }

    // expose init for manual calls if needed
    window.initTimeline = initTimeline;

    // Start loader on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadProcess);
    } else {
        loadProcess();
    }
})();
