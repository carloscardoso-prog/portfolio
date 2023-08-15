function openTab(evt, id) {
    $('.tab-content').hide();
    $('#' + id).show();
    $('.tab-link').removeClass('active');
    $(evt.currentTarget).addClass('active');
  }    

  function initPage() {
    let pageId = location.hash;

    if(pageId) {
      highlightMenu($(`.page-link[href^="${pageId}"]`)); 
      showPage($(pageId));
    }
    else {
      pageId = $('.page-link.active').attr('href');
      showPage($(pageId));
    }
  }

  function highlightMenu(menuItem) {
    $('.page-link').removeClass('active');
    menuItem.addClass('active');
  }

  function showPage(page) {
    $('.page-content').hide();
    page.show();
  }

  $(document).ready(function(){

    initPage();

    $('.page-link').click(function(event) {
      
      if(window.innerWidth > 991) {
        event.preventDefault();
      }

      highlightMenu($(event.currentTarget));
      showPage($(event.currentTarget.hash));
    });

    $('.tab-link').on('click', e => {
      e.preventDefault(); 
      openTab(e, $(e.target).data('id'));
    });

    $('.tab-link.active').click();
  });