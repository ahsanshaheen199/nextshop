'use client';

import { useEffect } from 'react';

export function MainMenuScript() {
  useEffect(() => {
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu) {
      mobileMenu.querySelectorAll('li.has-child .submenu-icon').forEach((link) => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const element = e.currentTarget as HTMLElement;
          const ul = element.previousElementSibling as HTMLElement;
          if (element.classList.contains('menu-open')) {
            element.classList.remove('menu-open');
            ul.style.display = 'none';
            ul.style.height = `0`;
          } else {
            element.classList.add('menu-open');
            ul.style.display = 'block';
            ul.style.height = `${ul.scrollHeight}px`;
          }
        });
      });
    }
  }, []);

  return null;
}
