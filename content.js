const replacementCharacter = '😀';
const debounceTimeMillisec = 5000;
const targetClass = '.cm-line';

console.log("Script loaded, checking readyState");

// Debounce function to limit the rate at which a function is executed
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize observer when DOM is ready
if (document.readyState !== "loading") {
    initObserver();
} else {
    document.addEventListener('DOMContentLoaded', initObserver);
}

// Sets up a MutationObserver to watch for changes in the DOM
function initObserver() {
    console.log("Initializing observer");

    const observer = new MutationObserver(debounce((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                const cmLines = document.querySelectorAll(targetClass);
                console.log(`Number of ${targetClass} elements: ${cmLines.length}`);
                if (cmLines.length > 0) {
                    cmLines.forEach(cmLine => {
                        processNode(cmLine);
                    });
                }
            }
        });
    }, debounceTimeMillisec));

    observer.observe(document.body, { childList: true, subtree: true });
}

// Processes each node based on its type
function processNode(node) {
    if (node.nodeType === 3) { // Text node
        handleText(node);
    } else if (node.nodeType === 1) { // Element node
        node.childNodes.forEach(processNode);
    }
}

// Handles text replacements in text nodes
function handleText(textNode) {
    const sel = document.getSelection();
    if (!sel.rangeCount) return; // Exit if there is no selection range

    const range = sel.getRangeAt(0);
    const atStart = (range.startContainer === textNode && range.startOffset === 0);
    const atEnd = (range.endContainer === textNode && range.endOffset === textNode.length);

    const text = textNode.nodeValue;
    const regex = /(　)/g;
    const parts = text.split(regex);

    if (parts.length > 1) {
        const fragment = document.createDocumentFragment();

        parts.forEach(part => {
            if (part === '　') {
                const span = document.createElement('span');
                span.textContent = replacementCharacter;
                fragment.appendChild(span);
            } else {
                fragment.appendChild(document.createTextNode(part));
            }
        });

        const parent = textNode.parentNode;
        parent.replaceChild(fragment, textNode);

        // Restore the cursor position
        if (atStart || atEnd) {
            const newRange = document.createRange();
            newRange.setStart(parent, atStart ? 0 : parent.childNodes.length - 1);
            newRange.setEnd(parent, atEnd ? parent.childNodes.length : 0);
            sel.removeAllRanges();
            sel.addRange(newRange);
        }
    }
}
