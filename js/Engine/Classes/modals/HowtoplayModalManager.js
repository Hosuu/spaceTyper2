export default class HowtoplayModalManager {
    engine;
    pages;
    paginationEl;
    paginationButtons;
    currentPage;
    constructor(engineRef) {
        this.engine = engineRef;
        this.pages = [];
        document
            .querySelectorAll('.howtoplay_page')
            .forEach((page) => this.pages.push(page));
        this.pages[0].classList.add('active');
        this.paginationEl = document.querySelector('.howtoplay_pagination');
        this.currentPage = 0;
        this.paginationEl.innerHTML = '';
        this.paginationButtons = [];
        for (let i = 0; i < this.pages.length; i++) {
            const button = document.createElement('div');
            button.classList.add('button');
            button.setAttribute('action', `howtoplay_page${i}`);
            button.setAttribute('active', i === 0 ? 'true' : 'false');
            this.paginationEl.appendChild(button);
            this.paginationButtons.push(button);
        }
    }
    nextPage() {
        this.switchPage((this.currentPage + 1) % this.pages.length);
    }
    prevPage() {
        this.switchPage(this.currentPage == 0 ? this.pages.length - 1 : this.currentPage - 1);
    }
    switchPage(page) {
        this.currentPage = page;
        this.pages.forEach((pageEl, index) => {
            if (index === page)
                pageEl.classList.add('active');
            else
                pageEl.classList.remove('active');
        });
        this.paginationButtons.forEach((button, index) => {
            button.setAttribute('active', String(index === page));
        });
    }
}
//# sourceMappingURL=HowtoplayModalManager.js.map