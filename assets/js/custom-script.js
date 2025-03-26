$(document).ready(function () {
  var copyButtonEventListener = function (event) {
    var thisButton = event.target;

    // Locate the <code> element
    var codeBlock = thisButton.nextElementSibling;
    while (codeBlock && codeBlock.tagName.toLowerCase() !== "code") {
      codeBlock = codeBlock.nextElementSibling;
    }
    if (!codeBlock) {
      // No <code> found - wtf?
      console.warn(thisButton);
      throw new Error("No code block found for this button.");
    }

    // Skip line numbers if present (i.e. {% highlight lineno %})
    var realCodeBlock = codeBlock.querySelector("td.code, td.rouge-code");
    if (realCodeBlock) {
      codeBlock = realCodeBlock;
    }
    var result = copyText(codeBlock.innerText);
    // Restore the focus to the button
    thisButton.focus();
    if (result) {
      if (thisButton.interval !== null) {
        clearInterval(thisButton.interval);
      }
      thisButton.classList.add("copied");
      thisButton.interval = setTimeout(function () {
        thisButton.classList.remove("copied");
        clearInterval(thisButton.interval);
        thisButton.interval = null;
      }, 1500);
    }
    return result;
  };

  if (window.enable_copy_code_button) {
    document
      .querySelectorAll(".page__content pre.highlight > code")
      .forEach(function (element, index, parentList) {
        // Locate the <pre> element
        var container = element.parentElement;
        // Sanity check - don't add an extra button if there's already one
        if (container.firstElementChild.tagName.toLowerCase() !== "code") {
          return;
        }
        const grandpa = container.parentElement.parentElement;
        let language = ""
        console.debug("trace" + container)
        if (grandpa.className.includes("highlighter-rouge")) {
          language = grandpa.className.split(" ")[0].split("-")[1]
        } else {
          language = "else"
        }
        const copyButton = document.createElement("button");
        const highlightTitleContainer = document.createElement("div");
        const capitalizedLanguage = language.charAt(0).toUpperCase() + language.slice(1);
        highlightTitleContainer.innerHTML = `<p class='highlight-title'>${capitalizedLanguage}</p>`;
        copyButton.title = "Copy to clipboard";
        copyButton.className = "clipboard-copy-button";
        copyButton.innerHTML =
          '<span class="sr-only">Copy code</span><i class="far fa-fw fa-copy"></i><i class="fas fa-fw fa-check copied"></i>';
        copyButton.addEventListener("click", copyButtonEventListener);
        container.prepend(copyButton);
        container.prepend(highlightTitleContainer);
      });
  }
});
