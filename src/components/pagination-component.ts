// Import Vue framework
import Vue, { ComponentOptions } from "vue";

export default Vue.extend({
  template: `
  <nav aria-label="Page navigation">
    <ul class="pagination justify-content-center">
      <li class="page-item"><a class="page-link previous" href="#" @click="prevPage">Previous</a></li>
      <li class="page-item"><a class="page-link next" href="#" @click="nextPage">Next</a></li>
    </ul>
  </nav>
  `,
  mounted: function() {
    NavigationController.initialize();    
  },
  methods: {
    nextPage() {
      // Perform some validation
      console.log("validating...");

      // Get the index of the next page to be rendered
      let nextPageIndex = NavigationController.getCurrentPage() + 1;

      this.$emit('navigation-changed', nextPageIndex);

      // Perform the actual DOM manipulation required to change page
      NavigationController.pageForward();
    },
    prevPage() {
      // Perform some validation
      console.log("validating...");

      // Perform the actual DOM manipulation required to change page
      NavigationController.pageBackward();
    }
  },
});

/**
 * This static class handles the DOM manipulation required for 
 * page navigation.
 * 
 * This separates the jQuery logic from the Vue logic above.
 * 
 * This class also handles the disabling of buttons at the start
 * and end of the page stack.
 * 
 * An intialize() method needs to be called to initalize the page
 * stack
 * 
 * Then pageForward() and pageBackward() methods control the
 * rendering of the correct pages.
 */
class NavigationController {
  // The current page is initally 0
  // Zero-indexed as we index into an array of pages
  private static currentPage = 0;
  private static pages : JQuery<HTMLElement>[] = [];

  static initialize() {
    // Insert each page div into an array of pages
    $('.page').each(function(index) {
      NavigationController.pages.push($(this));
    });

    // Set the first page to current
    NavigationController.pages[NavigationController.currentPage].addClass('current-page');
    $('.previous').parent().addClass('disabled');
  }

  static getCurrentPage() : number {
    return NavigationController.currentPage;
  }

  static pageForward() {
    if (NavigationController.currentPage == 0) {
      $('.previous').parent().removeClass('disabled');    
    }
    if (NavigationController.currentPage == NavigationController.pages.length - 2) {
      $('.next').parent().addClass('disabled');    
    }

    NavigationController.pages[NavigationController.currentPage].removeClass('current-page');
    NavigationController.currentPage += 1;
    NavigationController.pages[NavigationController.currentPage].addClass('current-page');
  }
  
  static pageBackward() {
    if (NavigationController.currentPage == 1) {
      $('.previous').parent().addClass('disabled');    
    }
    if (NavigationController.currentPage == NavigationController.pages.length - 1) {
      $('.next').parent().removeClass('disabled');    
    }
  
    NavigationController.pages[NavigationController.currentPage].removeClass('current-page');
    NavigationController.currentPage -= 1;
    NavigationController.pages[NavigationController.currentPage].addClass('current-page');
  }
}