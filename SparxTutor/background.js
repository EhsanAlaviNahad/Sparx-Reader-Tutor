chrome.action.onClicked.addListener((tab) => {
  if (!tab.id) {
    console.error("No active tab found.");
    return;
  }

  // Inject the content script into the active tab
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content.js"],
  }, () => {
    if (chrome.runtime.lastError) {
      console.error("Failed to inject content script:", chrome.runtime.lastError.message);
    } else {
      console.log("Content script injected successfully.");
    }
  });
});

// Handle messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'getStorage') {
    chrome.storage.local.get(request.keys, (result) => {
      sendResponse(result);
    });
    return true; // Will respond asynchronously
  }
  
  if (request.type === 'setStorage') {
    chrome.storage.local.set(request.data, () => {
      sendResponse({ success: true });
    });
    return true; // Will respond asynchronously
  }

  if (request.type === 'API_REQUEST') {
    // Create an AbortController to handle timeouts
    const controller = new AbortController();
    
    // Set a longer timeout - 45 seconds
    const timeoutId = setTimeout(() => {
      console.log("API request timed out, aborting fetch");
      controller.abort();
    }, 45000);

    // Track if response has been sent already
    let hasResponded = false;
    
    // Function to safely send response only once
    const safeResponse = (response) => {
      if (!hasResponded) {
        hasResponded = true;
        try {
          sendResponse(response);
        } catch (error) {
          console.error("Error sending response:", error);
        }
      }
    };

    console.log("Starting API fetch:", request.url);
    
    fetch(request.url, {
      method: request.method,
      headers: request.headers,
      body: request.body,
      signal: controller.signal
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log("API response received, parsing JSON");
      return response.json();
    })
    .then(data => {
      clearTimeout(timeoutId);
      console.log("API request successful");
      safeResponse({ success: true, data: data });
    })
    .catch(error => {
      clearTimeout(timeoutId);
      console.error("API Request Error:", error);
      safeResponse({ 
        success: false, 
        error: error.message || "Failed to complete the request",
        isTimeout: error.name === 'AbortError',
        details: String(error)
      });
    });

    // Set a backup timeout in case something goes really wrong
    setTimeout(() => {
      safeResponse({ 
        success: false, 
        error: "Request timed out - backup timeout triggered",
        isTimeout: true
      });
    }, 50000);

    return true; // Will respond asynchronously
  }
});