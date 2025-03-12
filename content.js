function hideYouTubeShorts() {
  function hideExistingShorts() {
    const reelShelfElements = document.querySelectorAll('ytd-reel-shelf-renderer');
    const richShelfElements = document.querySelectorAll('ytd-rich-shelf-renderer[is-shorts]');
    const richSectionElements = document.querySelectorAll('ytd-rich-section-renderer:has(ytd-rich-shelf-renderer[is-shorts])');
    
    reelShelfElements.forEach(element => {
      element.style.display = 'none';
    });
    
    richShelfElements.forEach(element => {
      element.style.display = 'none';
    });
    
    richSectionElements.forEach(element => {
      element.style.display = 'none';
    });
    
    const totalHidden = reelShelfElements.length + richShelfElements.length + richSectionElements.length;
    console.log(`Hidden ${totalHidden} YouTube Shorts sections`);
  }

  function hideShortsButton() {
    const shortsEntry = document.querySelector('ytd-guide-entry-renderer a[title="Shorts"]')?.closest('ytd-guide-entry-renderer');
    if (shortsEntry) {
      shortsEntry.style.display = 'none';
      console.log('Hidden YouTube Shorts button in the sidebar');
    }
  }

  hideExistingShorts();
  hideShortsButton();

  const observer = new MutationObserver((mutations) => {
    let newShortsFound = false;
    
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === 1) {
          if (
            node.tagName === 'YTD-REEL-SHELF-RENDERER' || 
            (node.tagName === 'YTD-RICH-SHELF-RENDERER' && node.hasAttribute('is-shorts')) ||
            (node.tagName === 'YTD-RICH-SECTION-RENDERER' && node.querySelector('ytd-rich-shelf-renderer[is-shorts]'))
          ) {
            node.style.display = 'none';
            newShortsFound = true;
          }
          
          const childReelElements = node.querySelectorAll('ytd-reel-shelf-renderer');
          const childRichElements = node.querySelectorAll('ytd-rich-shelf-renderer[is-shorts]');
          const childSectionElements = node.querySelectorAll('ytd-rich-section-renderer:has(ytd-rich-shelf-renderer[is-shorts])');
          
          const totalChildElements = childReelElements.length + childRichElements.length + childSectionElements.length;
          
          if (totalChildElements > 0) {
            childReelElements.forEach(element => {
              element.style.display = 'none';
            });
            
            childRichElements.forEach(element => {
              element.style.display = 'none';
            });
            
            childSectionElements.forEach(element => {
              element.style.display = 'none';
            });
            
            newShortsFound = true;
          }

          const shortsButton = node.querySelector('ytd-guide-entry-renderer a[title="Shorts"]')?.closest('ytd-guide-entry-renderer');
          if (shortsButton) {
            shortsButton.style.display = 'none';
            console.log('New YouTube Shorts button hidden');
          }
        }
      });
    });
    
    if (newShortsFound) {
      console.log('New YouTube Shorts sections hidden');
    }
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  
  return {
    stop: () => {
      observer.disconnect();
      console.log('YouTube Shorts hiding observer stopped');
    },
    recheck: () => {
      hideExistingShorts();
      hideShortsButton();
      console.log('Rechecked and hid any new YouTube Shorts sections and button');
    }
  };
}

const shortsHider = hideYouTubeShorts();
