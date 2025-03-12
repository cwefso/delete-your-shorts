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
    const shortsButton = document.querySelector('a[title="Shorts"]');
    if (shortsButton) {
      shortsButton.style.display = 'none';
      console.log('Hidden YouTube Shorts button in the sidebar');
    }
  }
  
  hideExistingShorts();
  hideShortsButton();
}

hideYouTubeShorts();