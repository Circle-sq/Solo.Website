import type { HeaderItemType } from './HeaderMeta';

const getChildren = (parent: Element): Element[] => {
    const list: Element[] = [];
    const children = parent.children;
    const max = children.length;

    for (let i = 0; i < max; i++) {
        const item = children.item(i);

        if (item) {
            list.push(item);
        } else {
            console.error('HeaderMeta - BrowserApply - getChildren error');
        }
    }

    return list;
};

const removeNode = (node: ChildNode) => {
    const parent = node.parentElement;

    if (parent) {
        parent.removeChild(node);
    } else {
        console.error('HeaderMeta - BrowserApply - removeNode error');
    }
};

const getCurrentList = (head: HTMLHeadElement): Map<string, Element> => {
    const currentList: Map<string, Element> = new Map();

    for (const item of getChildren(head)) {
        const metaId = item.getAttribute('data-header-meta-id');

        if (typeof metaId === 'string') {
            if (currentList.has(metaId)) {
                removeNode(item);
            } else {
                currentList.set(metaId, item);
            }
        }
    }

    return currentList;
};

const getRefNode = (head: HTMLHeadElement): Element | null => {
    const children = getChildren(head);

    for (const item of children) {
        if (item.nodeType === 8) {
            const textContent = item.textContent;

            if (textContent && textContent.indexOf('HeaderMetaRoot') >= 0) {
                return item;
            }
        }
    }

    const first = children[0];

    return first ? first : null;
};

const createTextNode = (node: Element, text: string) => {
    const textNode = document.createTextNode(text);

    node.appendChild(textNode);
};

const createNode = (item: HeaderItemType): HTMLElement => {
    const node = document.createElement(item.tag);

    node.setAttribute('data-header-meta-id', item.id);

    for (const [name, value] of Object.entries(item.attr)) {
        node.setAttribute(name, value);
    }

    const text = item.text;

    if (text) {
        createTextNode(node, text);
    }

    return node;
};

const removeAllChildren = (node: Element) => {
    while (node.childNodes.length > 0) {
        const item = node.childNodes.item(0);

        if (item) {
            removeNode(item);
        } else {
            console.error('HeaderMeta - BrowserApply - Error with delete node');
        }
    }
};

const updateNode = (currentNode: Element, item: HeaderItemType) => {
    for (const [key, value] of Object.entries(item.attr)) {
        if (currentNode.getAttribute(key) !== value) {
            currentNode.setAttribute(key, value);
        }
    }

    if (item.text === undefined) {
        removeAllChildren(currentNode);
    } else {
        if (currentNode.textContent !== item.text) {
            removeAllChildren(currentNode);

            createTextNode(currentNode, item.text);
        }
    }
};

export const browserApply = (head: HTMLHeadElement, list: HeaderItemType[]) => {
    const currentNodes = getCurrentList(head);

    const refNode = getRefNode(head);

    for (const item of list) {
        const id = item.id;

        const currentNode = currentNodes.get(id);

        currentNodes.delete(id);

        if (currentNode) {
            updateNode(currentNode, item);
        } else {
            const newNode = createNode(item);

            head.insertBefore(newNode, refNode);
        }
    }
};
