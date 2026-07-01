(function () {
    'use strict';

    const POSTS_GRID_SELECTOR = '#blog-posts-grid';
    const SEARCH_INPUT_SELECTOR = '#blog-search-input';
    const SEARCH_FORM_SELECTOR = '#blog-search-form';
    const POST_CARD_SELECTOR = '.blog-item';
    const NO_RESULTS_SELECTOR = '#blog-no-results';
    const CATEGORY_LINK_SELECTOR = '[data-category]';
    const ACTIVE_CATEGORY_CLASS = 'active-category';

    let postsData = [];
    let searchTimeout = null;
    const DEBOUNCE_MS = 300;

    function getUrlParams() {
        const params = new URLSearchParams(window.location.search);
        return {
            q: (params.get('q') || '').trim().toLowerCase(),
            cat: (params.get('cat') || '').trim().toLowerCase()
        };
    }

    function updateUrlParams(q, cat) {
        const params = new URLSearchParams();
        if (q) params.set('q', q);
        if (cat) params.set('cat', cat);
        const newUrl = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
        history.replaceState(null, '', newUrl);
    }

    function getCardData(card) {
        const titleEl = card.querySelector('h4');
        const excerptEl = card.querySelector('p');
        const badgeEl = card.querySelector('.blog-img a');
        const tags = card.dataset.tags || '';
        const category = badgeEl ? badgeEl.textContent.trim() : '';
        const title = titleEl ? titleEl.textContent.trim() : '';
        const excerpt = excerptEl ? excerptEl.textContent.trim() : '';
        return { title, excerpt, category, tags };
    }

    function matchCard(card, keyword, category) {
        const data = getCardData(card);
        const searchText = (data.title + ' ' + data.excerpt + ' ' + data.category + ' ' + data.tags).toLowerCase();
        const catSlug = data.category.toLowerCase().replace(/\s+/g, '-');

        if (keyword && !searchText.includes(keyword)) return false;
        if (category && catSlug !== category) return false;
        return true;
    }

    function getVisibleCount() {
        const cards = document.querySelectorAll(POST_CARD_SELECTOR);
        let count = 0;
        cards.forEach(function (card) {
            if (!card.closest('.d-none')) count++;
        });
        return count;
    }

    function applyFilters(keyword, category) {
        const cards = document.querySelectorAll(POST_CARD_SELECTOR);
        const noResults = document.querySelector(NO_RESULTS_SELECTOR);
        const pagination = document.querySelector('.pagination');

        cards.forEach(function (card) {
            const wrapper = card.closest('.col-md-6');
            if (!wrapper) return;
            const match = matchCard(card, keyword, category);
            wrapper.classList.toggle('d-none', !match);
        });

        const visible = getVisibleCount();
        if (noResults) noResults.classList.toggle('d-none', visible > 0);
        if (pagination) pagination.closest('.col-12').classList.toggle('d-none', visible === 0);

        updateUrlParams(keyword, category);
        highlightActiveCategory(category);
    }

    function highlightActiveCategory(categorySlug) {
        document.querySelectorAll(CATEGORY_LINK_SELECTOR).forEach(function (link) {
            const cat = link.getAttribute('data-category');
            link.classList.toggle(ACTIVE_CATEGORY_CLASS, cat === categorySlug && categorySlug !== '');
        });
    }

    function handleSearchInput(e) {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(function () {
            const params = getUrlParams();
            const keyword = e.target.value.trim().toLowerCase();
            applyFilters(keyword, params.cat);
        }, DEBOUNCE_MS);
    }

    function handleSearchSubmit(e) {
        e.preventDefault();
        const input = document.querySelector(SEARCH_INPUT_SELECTOR);
        if (!input) return;
        const keyword = input.value.trim().toLowerCase();
        const params = getUrlParams();

        if (document.querySelector(POSTS_GRID_SELECTOR)) {
            applyFilters(keyword, params.cat);
        } else {
            window.location.href = '/blog/?q=' + encodeURIComponent(keyword);
        }
    }

    function handleCategoryClick(e) {
        e.preventDefault();
        const link = e.currentTarget;
        const categorySlug = link.getAttribute('data-category');
        const params = getUrlParams();

        if (document.querySelector(POSTS_GRID_SELECTOR)) {
            const newCat = categorySlug === params.cat ? '' : categorySlug;
            applyFilters(params.q, newCat);
        } else {
            window.location.href = '/blog/?cat=' + encodeURIComponent(categorySlug);
        }
    }

    function initFromUrlParams() {
        const params = getUrlParams();
        const input = document.querySelector(SEARCH_INPUT_SELECTOR);

        if (params.q && input) {
            input.value = params.q;
        }

        if (document.querySelector(POSTS_GRID_SELECTOR)) {
            applyFilters(params.q, params.cat);
        }
    }

    function initSearch() {
        const searchForm = document.querySelector(SEARCH_FORM_SELECTOR);
        const searchInput = document.querySelector(SEARCH_INPUT_SELECTOR);

        if (searchForm) searchForm.addEventListener('submit', handleSearchSubmit);
        if (searchInput) searchInput.addEventListener('input', handleSearchInput);

        document.querySelectorAll(CATEGORY_LINK_SELECTOR).forEach(function (link) {
            link.addEventListener('click', handleCategoryClick);
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        initSearch();
        initFromUrlParams();
    });

})();
