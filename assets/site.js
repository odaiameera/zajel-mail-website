// Theme toggle, mobile menu, tabbed galleries, install tabs, copy buttons
// and a screenshot lightbox. No dependencies.
(() => {
	const root = document.documentElement;

	// ---- theme: follows the system until the visitor picks one
	const stored = (() => {
		try {
			return localStorage.getItem('theme');
		} catch {
			return null;
		}
	})();
	if (stored === 'light' || stored === 'dark') root.dataset.theme = stored;
	const current = () =>
		root.dataset.theme || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
	const themeBtn = document.querySelector('[data-theme-toggle]');
	const syncThemeLabel = () =>
		themeBtn?.setAttribute('aria-label', current() === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
	syncThemeLabel();
	themeBtn?.addEventListener('click', () => {
		const next = current() === 'dark' ? 'light' : 'dark';
		root.dataset.theme = next;
		try {
			localStorage.setItem('theme', next);
		} catch {}
		syncThemeLabel();
	});

	// ---- mobile menu
	const menuBtn = document.querySelector('[data-menu]');
	const nav = document.querySelector('.nav');
	menuBtn?.addEventListener('click', () => {
		const open = nav.classList.toggle('open');
		menuBtn.setAttribute('aria-expanded', String(open));
	});
	nav?.addEventListener('click', (e) => {
		if (e.target.closest('a')) {
			nav.classList.remove('open');
			menuBtn?.setAttribute('aria-expanded', 'false');
		}
	});

	// ---- tab groups (screenshot galleries and the install steps)
	for (const group of document.querySelectorAll('[data-tabs]')) {
		const buttons = [...group.querySelectorAll('[role="tab"]')];
		const select = (button) => {
			for (const b of buttons) {
				const on = b === button;
				b.setAttribute('aria-selected', String(on));
				b.tabIndex = on ? 0 : -1;
				document.getElementById(b.getAttribute('aria-controls')).hidden = !on;
			}
		};
		buttons.forEach((b, i) => {
			b.addEventListener('click', () => select(b));
			b.addEventListener('keydown', (e) => {
				const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
				if (!step) return;
				const next = buttons[(i + step + buttons.length) % buttons.length];
				select(next);
				next.focus();
			});
		});
	}

	// ---- copy buttons on code blocks
	for (const block of document.querySelectorAll('.code')) {
		const button = document.createElement('button');
		button.type = 'button';
		button.className = 'copy';
		button.textContent = 'Copy';
		button.addEventListener('click', async () => {
			const text = block.querySelector('pre').innerText.trim();
			try {
				await navigator.clipboard.writeText(text);
				button.textContent = 'Copied';
			} catch {
				const range = document.createRange();
				range.selectNodeContents(block.querySelector('pre'));
				const sel = getSelection();
				sel.removeAllRanges();
				sel.addRange(range);
				button.textContent = 'Selected';
			}
			setTimeout(() => (button.textContent = 'Copy'), 1600);
		});
		block.appendChild(button);
	}

	// ---- lightbox for screenshots
	const box = document.querySelector('.lightbox');
	const boxImg = box?.querySelector('img');
	const boxCaption = box?.querySelector('p');
	document.addEventListener('click', (e) => {
		const img = e.target.closest('.frame img, .phone img');
		if (!img || !box) return;
		boxImg.src = img.currentSrc || img.src;
		boxImg.alt = img.alt;
		boxCaption.textContent = img.alt;
		box.showModal();
	});
	box?.addEventListener('click', () => box.close());
})();
