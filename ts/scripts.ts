//gerencia abas em projetos
function openTab(evt: MouseEvent, id: string):void{
    let tabContentElements = document.getElementsByClassName("tab-content") as HTMLCollectionOf<HTMLElement>;
    let tabLinkElements = document.getElementsByClassName("tab-link") as HTMLCollectionOf<HTMLElement>;
    let idObject = document.getElementById(id) as HTMLElement;
    if(isNotNullArray([tabContentElements, tabLinkElements, idObject, evt])){
        let arrayTabContent = Array.from(tabContentElements);
        let arrayTabLink = Array.from(tabLinkElements);
        let currentEventTarget = evt.currentTarget as HTMLElement;

        arrayTabContent.forEach(tabContentElement => (tabContentElement.style.display = "none"));
        idObject.style.display = "inherit";

        arrayTabLink.forEach(tabLinkElement => (tabLinkElement.classList.remove("active")));
        
        currentEventTarget.classList.add("active");
    }
}

//verifica se o array passado não é nulo
function isNotNullArray<T>(values: T[]): values is NonNullable<T>[]{
    return (values.every(value => isNotNull(value)));
}

//verifica se o objeto não é nulo
function isNotNull<T>(value: T): value is NonNullable<T>{
    return (value !== null && value !== undefined);
}

//marca o nome do menu selecionado
function highlightMenu(menuItems: NodeListOf<Element> | HTMLCollectionOf<HTMLElement> | HTMLElement):void{
    
    let pageLinkObjects = document.getElementsByClassName("page-link") as HTMLCollectionOf<HTMLElement>;
    
    if(isNotNullArray([pageLinkObjects, menuItems])){
        let arrayPageLink = Array.from(pageLinkObjects);
        arrayPageLink.forEach(pageLink => (pageLink.classList.remove('active')));
        
        if(menuItems instanceof HTMLElement){
            menuItems.classList.add('active');
        }else{
            let arrayMenuItems = Array.from(menuItems);
            arrayMenuItems.forEach(arrayMenu => (arrayMenu.classList.add('active')));
        }
    }
  }

//mostra o menu selecionado
function showPage(pages: HTMLElement | HTMLCollectionOf<HTMLElement>): void{
    
    let pageContentObjects = document.getElementsByClassName('page-content') as HTMLCollectionOf<HTMLElement>;
    
    if(isNotNullArray([pages, pageContentObjects])){
        let arrayPageContent = Array.from(pageContentObjects);
        arrayPageContent.forEach(pageContent => (pageContent.style.display = 'none'));

        if((pages instanceof HTMLCollection)){
            let arrayPages = Array.from(pages) as HTMLElement[];
            arrayPages.forEach(
                function(page){
                        let pageId = page.getAttribute("href");
                        if(page.classList.contains('active') && isNotNull(pageId)){
                            let abaProjeto = document.getElementById(pageId.substring(1));
                            if(isNotNull(abaProjeto)){
                                abaProjeto.style.display = 'inherit';
                            }
                        }
                    });

        }else if (pages instanceof HTMLElement){
            pages.style.display = 'inherit';
        }
    }
}

//realiza inicialização da página
function initPage():void{
    let pageId: string | HTMLCollectionOf<HTMLElement>;
    if(location.hash){
        pageId = location.hash;
        let objectsPageLink = document.querySelectorAll(`.page-link[href^="${pageId}"]`);
        let objectPageId = document.getElementById(pageId.substring(1));

        if(isNotNull(objectPageId) && isNotNull(objectsPageLink)){
            highlightMenu(objectsPageLink);
            showPage(objectPageId);  
        }
    }else{
        pageId = document.getElementsByClassName('page-link') as HTMLCollectionOf<HTMLElement>;
        showPage(pageId);
    }
}

//executa o fluxo da padrão da página
document.addEventListener("DOMContentLoaded", function(event){
    initPage();

    let pageLinkObjects = document.getElementsByClassName('page-link') as HTMLCollectionOf<HTMLElement>;
    let arrayPageLink = Array.from(pageLinkObjects);

    arrayPageLink.forEach(pageLink => (pageLink.onclick = (clickEvent) => {

        if(window.innerWidth > 991){ 
            clickEvent.preventDefault();
        }

        if(isNotNull(clickEvent.currentTarget)){
            let eventString = clickEvent.currentTarget as HTMLElement;
            highlightMenu(eventString);

            let selectedTabId = (eventString as HTMLElement).getAttribute('href');

            if(isNotNull(selectedTabId)){
                let selectedObject = document.getElementById(selectedTabId.substring(1));
                if(isNotNull(selectedObject)){
                    showPage(selectedObject);
                }
            }
        }
    }));

    let tabLinkObject = document.getElementsByClassName('tab-link') as HTMLCollectionOf<HTMLElement>;
        let arrayTabLink = Array.from(tabLinkObject);

        arrayTabLink.forEach(tabLink => (tabLink.onclick = (clickEvent) => {
            clickEvent.preventDefault();

            if(clickEvent.target instanceof HTMLElement){
                let targetObject = clickEvent.target.getAttribute('data-id');
                if(targetObject !== null && clickEvent.target !== null){                    
                    openTab(clickEvent, targetObject);
                }
            }
        }));

        let indexTabActive = arrayTabLink.findIndex(tabLink => tabLink.classList.contains('active'));
        arrayTabLink[indexTabActive].click();
});