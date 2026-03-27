import { developers } from './data.js';

/**
 * Renders developer cards into the #cards-grid container.
 * @param {Array} devs - Array of developer objects.
 */
function renderCards(devs) {
    const grid = document.getElementById('cards-grid');
    if (!grid) return;

    // Clear loading state
    grid.innerHTML = '';

    devs.forEach(dev => {
        const card = document.createElement('article');
        card.className = "profile-card flex flex-col bg-brand-card border-[1.5px] border-brand-border rounded-[18px] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(99,102,241,0.15)] hover:border-[#a5b4fc]";

        // Navigation on click
        card.onclick = (e) => {
            if (e.target.tagName.toLowerCase() !== 'a') {
                window.location.href = `profile.html?dev=${dev.id}`;
            }
        };

        // Handle Avatar vs Initials
        const avatarContent = dev.avatar
            ? `<img src="${dev.avatar}" alt="${dev.name} – ${dev.role}" class="avatar w-[90px] h-[90px] rounded-full object-cover border-3 border-[#a5b4fc] shadow-[0_0_0_6px_rgba(99,102,241,0.1)]" />`
            : `<div class="avatar w-[90px] h-[90px] rounded-full border-3 border-[#a5b4fc] shadow-[0_0_0_6px_rgba(99,102,241,0.1)] flex items-center justify-center bg-blue-600 text-white text-3xl font-bold">${dev.initials}</div>`;

        // Skills (First 3 like hardcoded)
        const skillTags = dev.skills.slice(0, 3).map(skill =>
            `<span class="bg-[#eef2ff] border border-[#c7d2fe] text-brand-accent2 text-[0.72rem] font-semibold px-2.5 py-1 rounded-full">${skill}</span>`
        ).join('');

        // Availability badge
        const availabilityBadge = dev.available
            ? `<div class="availability available absolute top-3.5 right-3.5 text-[0.7rem] font-bold tracking-[0.04em] px-2.5 py-1 rounded-full bg-[#dcfce7] text-brand-green border border-[#bbf7d0]">Available</div>`
            : `<div class="availability absolute top-3.5 right-3.5 text-[0.7rem] font-bold tracking-[0.04em] px-2.5 py-1 rounded-full bg-red-100 text-red-600 border border-red-200">Unavailable</div>`;

        card.innerHTML = `
            <div class="card-top relative flex justify-center bg-[linear-gradient(145deg,#eef2ff,#f5f3ff)] px-6 py-7 pb-5">
                ${avatarContent}
                ${availabilityBadge}
            </div>
            <div class="card-body p-6 flex flex-col flex-1 cursor-pointer">
                <h3 class="card-name text-[1.05rem] font-bold mb-1 text-brand-text">${dev.name}</h3>
                <p class="card-role text-[0.82rem] text-brand-accent font-semibold mb-3.5">${dev.role}</p>
                <div class="card-skills flex flex-wrap gap-1.5 mb-4">
                    ${skillTags}
                </div>
                <div class="card-meta flex justify-between text-[0.75rem] text-brand-muted mt-auto">
                    <span class="card-exp">${dev.experience || ''}</span>
                    <span class="card-location">📍 ${dev.location}</span>
                </div>
            </div>
            <a href="profile.html?dev=${dev.id}" class="card-btn block text-center mx-6 mb-6 py-2.5 rounded-[10px] bg-[#eef2ff] border-[1.5px] border-[#c7d2fe] text-brand-accent2 text-[0.85rem] font-bold no-underline transition-all duration-200 hover:bg-brand-accent hover:text-white hover:border-brand-accent">View Profile</a>
        `;

        grid.appendChild(card);
    });
}

// Initialize the app — route by current page
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    if (path.endsWith('profile.html')) {
        renderProfile();
    } else {
        renderCards(developers);
    }
});

/**
 * Reads the ?dev= URL parameter, finds the matching developer,
 * and populates all placeholder elements on profile.html.
 * Redirects to 404 state if the ID is invalid.
 */
function renderProfile() {
    const params = new URLSearchParams(window.location.search);
    const devId = params.get('dev');
    const dev = developers.find(d => d.id === devId);

    // ── 404 state ────────────────────────────────────────────────
    if (!dev) {
        document.querySelectorAll('main > div:not(#profile-error)').forEach(el => el.classList.add('hidden'));
        document.getElementById('profile-error')?.classList.remove('hidden');
        return;
    }

    // ── Avatar ───────────────────────────────────────────────────
    const avatarWrapper = document.getElementById('profile-avatar-wrapper');
    if (avatarWrapper) {
        avatarWrapper.innerHTML = dev.avatar
            ? `<img src="${dev.avatar}" alt="${dev.name}" class="w-full h-full object-cover">`
            : `<div class="w-full h-full flex items-center justify-center bg-blue-600 text-white text-3xl font-bold">${dev.initials}</div>`;
    }

    // ── Text fields ───────────────────────────────────────────────
    const setText = (id, value) => { const el = document.getElementById(id); if (el) el.textContent = value || '—'; };
    setText('profile-name', dev.name);
    setText('profile-role', dev.role);
    setText('profile-location', dev.location);
    setText('profile-bio', dev.bio);
    setText('profile-dob', dev.dob);
    setText('profile-email', dev.email);
    setText('profile-phone', dev.phone);
    setText('profile-website', dev.website || dev.name);

    // ── Availability badge ───────────────────────────────────────
    const badge = document.getElementById('profile-availability');
    if (badge) {
        badge.textContent = dev.available ? 'Available' : 'Not Available';
        badge.className += dev.available ? ' bg-green-100 text-green-700' : ' bg-red-100 text-red-600';
    }

    // ── Skills (Tech Stacks Icons) ───────────────────────────────────────────────────
    const skillsEl = document.getElementById('profile-skills');
    if (skillsEl && dev.skills) {
        skillsEl.innerHTML = dev.skills.map(skill => {
            const style = { 
                bg: 'bg-indigo-50/70', 
                text: 'text-indigo-700', 
                border: 'border-indigo-100/80', 
                dot: 'bg-indigo-500' 
            };
            return `
            <div class="${style.bg} ${style.text} ${style.border} border px-4 py-2 rounded-xl text-[0.82rem] font-bold tracking-wide shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-default flex items-center gap-2 group whitespace-nowrap">
                <span class="w-1.5 h-1.5 rounded-full ${style.dot} opacity-60 group-hover:opacity-100 transition-opacity"></span>
                ${skill}
            </div>
            `;
        }).join('');
    }

    // ── Projects ─────────────────────────────────────────────────
    // Removed unused projects rendering module as requested by user.

    // ── Social Links ─────────────────────────────────────────────
    const linksEl = document.getElementById('profile-links');
    if (linksEl && dev.links) {
        const cfg = {
            github: { icon: 'fa-brands fa-github text-[1.3rem]', hover: 'hover:text-gray-900 border-gray-200 hover:border-gray-900 hover:bg-gray-50' },
            linkedin: { icon: 'fa-brands fa-linkedin-in text-[1.2rem]', hover: 'hover:text-[#0a66c2] border-gray-200 hover:border-[#0a66c2] hover:bg-[#eff6fb]' },
            portfolio: { icon: 'fa-solid fa-link text-[1.1rem]', hover: 'hover:text-brand-accent border-gray-200 hover:border-brand-accent hover:bg-indigo-50' },
        };

        linksEl.innerHTML = Object.entries(dev.links)
            .filter(([, url]) => url)
            .map(([key, url]) => {
                const style = cfg[key] || { icon: 'fa-solid fa-globe', hover: 'hover:text-blue-500 border-gray-200 hover:border-blue-500' };
                return `<a href="${url}" target="_blank" rel="noopener noreferrer" title="${key.charAt(0).toUpperCase() + key.slice(1)}"
                    class="w-11 h-11 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${style.hover}">
                    <i class="${style.icon}"></i>
                </a>`;
            }).join('');
    }

    // ── Page title ────────────────────────────────────────────────
    document.title = `${dev.name} | Dev Talent Board`;

    // ── Hire Me Modal Logic ──────────────────────────────────────
    const hireBtn = document.getElementById('hire-btn');
    const hireModal = document.getElementById('hire-modal');
    const hireModalContent = document.getElementById('hire-modal-content');
    const hireModalClose = document.getElementById('hire-modal-close');
    const hireForm = document.getElementById('hire-form');
    const hireModalTitle = document.getElementById('hire-modal-title');

    if (hireBtn && hireModal) {
        const toggleModal = (show) => {
            if (show) {
                // Determine dynamic Formspree route and custom title
                hireModalTitle.textContent = `Hire ${dev.name.split(' ')[0]}`;
                hireForm.action = `https://formspree.io/${dev.email}`;

                hireModal.style.display = 'flex';
                hireModalContent.classList.add('scale-100');
            } else {
                hireModal.style.display = 'none';
                hireModalContent.classList.remove('scale-100');
            }
        };

        hireBtn.addEventListener('click', () => toggleModal(true));
        hireModalClose.addEventListener('click', () => toggleModal(false));
        hireModal.addEventListener('click', (e) => {
            // Close if background blur overlay is clicked instead of the card
            if (e.target === hireModal) toggleModal(false);
        });

        hireForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Stop Formspree navigation

            toggleModal(false); // Close Modal immediately
            hireForm.reset();   // Clear all inputs

            // Generate an elegant floating toast notification popup
            const toast = document.createElement('div');
            toast.style.cssText = `
                position: fixed;
                bottom: 2rem;
                left: 50%;
                transform: translate(-50%, 1.5rem);
                background-color: #111827;
                color: #ffffff;
                padding: 0.875rem 1.5rem;
                border-radius: 9999px;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
                display: flex;
                align-items: center;
                gap: 0.75rem;
                transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
                opacity: 0;
                z-index: 9999;
                pointer-events: none;
                font-family: inherit;
            `;
            toast.innerHTML = '<i class="fa-solid fa-circle-check" style="color: #4ade80; font-size: 1.1rem;"></i><span style="font-weight: 700; font-size: 0.85rem; letter-spacing: 0.025em;">Message successfully sent!</span>';

            document.body.appendChild(toast);

            // Animate In securely using CSSom
            setTimeout(() => {
                toast.style.transform = 'translate(-50%, 0)';
                toast.style.opacity = '1';
            }, 50);

            // Animate Out and destroy after 3.5s
            setTimeout(() => {
                toast.style.transform = 'translate(-50%, 1.5rem)';
                toast.style.opacity = '0';
                setTimeout(() => toast.remove(), 350);
            }, 3500);
        });
    }
}
