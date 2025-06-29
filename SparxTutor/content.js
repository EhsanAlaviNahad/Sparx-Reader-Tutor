// Function to create and inject the overlay UI into the webpage
function createOverlayUI() {
  if (document.getElementById("custom-text-extractor-overlay")) {
    console.log("Overlay already exists!");
    return;
  }

  // Create the overlay container
  const overlay = document.createElement("div");
  overlay.id = "custom-text-extractor-overlay";
  overlay.style.position = "fixed";
  overlay.style.top = "80px";
  overlay.style.right = "100px";
  overlay.style.width = "400px";
  overlay.style.height = "auto";
  overlay.style.maxHeight = "400px";
  overlay.style.backgroundColor = "rgba(203, 232, 239, 1)";
  overlay.style.border = "none";
  overlay.style.borderRadius = "16px";
  overlay.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.25)";
  overlay.style.zIndex = "10000";
  overlay.style.fontFamily = "'Korto', sans-serif";
  overlay.style.overflow = "hidden";
  overlay.style.cursor = "grab";
  overlay.style.opacity = "0";
  overlay.style.transform = "translateY(-20px)";
  overlay.style.transition = "opacity 0.3s ease, transform 0.3s ease";

  // Trigger the fade-in animation after a small delay
  setTimeout(() => {
    overlay.style.opacity = "1";
    overlay.style.transform = "translateY(0)";
  }, 50);

  // Create the header
  const header = document.createElement("div");
  header.style.background = "linear-gradient(135deg, #1e3d3d, #428080, #1e3d3d, #428080)";
  header.style.backgroundSize = "400% 400%";
  header.style.animation = "gradientFlow 15s ease infinite";
  header.style.color = "white";
  header.style.padding = "20px";
  header.style.fontSize = "24px";
  header.style.fontWeight = "bold";
  header.style.textAlign = "center";
  header.style.position = "relative";
  header.style.cursor = "grab";
  header.style.display = "flex";
  header.style.alignItems = "center";
  header.style.justifyContent = "center";
  header.style.overflow = "hidden";
  header.style.minHeight = "70px";
  header.style.borderTopLeftRadius = "16px";
  header.style.borderTopRightRadius = "16px";

  // Create new header image
  const headerImage = document.createElement("img");
  headerImage.src = chrome.runtime.getURL("ss2.png");
  headerImage.style.height = "40px";
  headerImage.style.width = "auto";
  headerImage.style.margin = "0 auto";
  headerImage.style.display = "block";
  headerImage.style.userSelect = "none";
  headerImage.style.pointerEvents = "none";
  headerImage.style.webkitUserDrag = "none";
  headerImage.style.filter = "brightness(1)";
  headerImage.style.transition = "filter 0.3s ease";

  // Add the close button ("X")
  const closeButton = document.createElement("button");
  closeButton.id = "closeOverlayButton";
  closeButton.setAttribute("aria-label", "Close");
  closeButton.style.position = "absolute";
  closeButton.style.top = "50%";
  closeButton.style.right = "25px";
  closeButton.style.width = "32px";
  closeButton.style.height = "32px";
  closeButton.style.backgroundColor = "transparent";
  closeButton.style.border = "none";
  closeButton.style.cursor = "pointer";
  closeButton.style.display = "flex";
  closeButton.style.alignItems = "center";
  closeButton.style.justifyContent = "center";
  closeButton.style.transform = "translateY(-50%)";
  closeButton.style.padding = "0";

  header.appendChild(headerImage);
  header.appendChild(closeButton);
  overlay.appendChild(header);

  // Add password modal styles
  const styleSheet = document.createElement("style");
  styleSheet.textContent = `
    .button-hover {
      animation: buttonAnimation 2s infinite !important;
      background-size: 200% auto !important;
      border-radius: 12px !important;
    }

    @keyframes buttonAnimation {
      0% {
        background-position: 0% center;
        transform: scale(1);
      }
      50% {
        background-position: 100% center;
        transform: scale(1.05);
      }
      100% {
        background-position: 0% center;
        transform: scale(1);
      }
    }

    .chat-container {
      display: none;
      margin-top: 15px;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      background-color: #f5f5f5;
      height: 300px;
      opacity: 0;
      transform: translateY(-10px);
      transition: opacity 0.3s ease, transform 0.3s ease;
    }

    .chat-container.visible {
      opacity: 1;
      transform: translateY(0);
    }

    .chat-container.closing {
      opacity: 0;
      transform: translateY(-10px);
    }

    .chat-messages {
      padding: 15px;
      height: 230px;
      overflow-y: auto;
      background-color: #f5f5f5;
      scroll-behavior: smooth;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .message {
      padding: 12px 16px;
      margin-bottom: 10px;
      border-radius: 16px;
      max-width: 85%;
      word-wrap: break-word;
      line-height: 1.5;
      position: relative;
      animation: messageAppear 0.3s ease;
      white-space: pre-wrap;
      font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
      font-size: 14px;
    }

    @keyframes messageAppear {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .user-message {
      background-color: #1e3d3d;
      color: white;
      border-bottom-right-radius: 4px;
      align-self: flex-end;
      margin-left: auto;
    }

    .ai-message {
      background-color: #e1e1e1;
      color: #333;
      border-bottom-left-radius: 4px;
      align-self: flex-start;
    }

    .offline-notice {
      background-color: #1a3333 !important;
      color: #ffcc00 !important;
      font-size: 12px !important;
      text-align: center;
      width: 100%;
      max-width: 100%;
      border-radius: 4px !important;
    }

    .chat-input-container {
      display: flex;
      padding: 10px;
      background-color: #fff;
      border-top: 1px solid #ddd;
      align-items: flex-start;
    }

    .chat-input {
      flex: 1;
      padding: 12px 15px;
      border: 1px solid #ccc;
      border-radius: 16px;
      outline: none;
      font-size: 14px;
      resize: none;
      min-height: 24px;
      max-height: 120px;
      line-height: 1.5;
      overflow-y: auto;
      white-space: pre-wrap;
      word-wrap: break-word;
      font-family: inherit;
      box-sizing: border-box;
      height: auto;
    }

    .chat-input:focus {
      border-color: #1e3d3d;
      box-shadow: 0 0 0 2px rgba(30, 61, 61, 0.1);
    }

    .send-button {
      background-color: #1e3d3d;
      color: white;
      border: none;
      border-radius: 16px;
      padding: 10px 20px;
      margin-left: 10px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .send-button:hover {
      background-color: #2a5050;
    }

    .send-button:active {
      transform: scale(0.98);
    }

    .success-message {
      color: #28a745;
      background-color: rgba(40, 167, 69, 0.1);
      padding: 10px;
      border-radius: 12px;
      margin: 10px 0;
      text-align: center;
      font-weight: bold;
      opacity: 0;
      transform: translateY(-10px);
      transition: opacity 0.3s ease, transform 0.3s ease;
      position: absolute;
      bottom: 60px; /* Position above the input box */
      left: 0;
      right: 0;
      z-index: 1000;
    }

    .success-message.visible {
      opacity: 1;
      transform: translateY(0);
    }

    .success-message.error {
      color: #dc3545;
      background-color: rgba(220, 53, 69, 0.1);
    }

    @keyframes buttonHover {
      0% {
        transform: translateY(0) scale(1);
        background-position: 0% center;
      }
      50% {
        transform: translateY(-2px) scale(1.02);
        background-position: 100% center;
      }
      100% {
        transform: translateY(0) scale(1);
        background-position: 0% center;
      }
    }

    @keyframes buttonClick {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(0.95);
      }
      100% {
        transform: scale(1);
      }
    }

    @keyframes closeButtonHover {
      0% {
        transform: rotate(0deg) scale(1);
      }
      50% {
        transform: rotate(180deg) scale(1.1);
      }
      100% {
        transform: rotate(360deg) scale(1);
      }
    }

    @keyframes closeButtonClick {
      0% {
        transform: scale(1) rotate(180deg);
      }
      50% {
        transform: scale(0.8) rotate(180deg);
      }
      100% {
        transform: scale(1) rotate(180deg);
      }
    }

    #closeOverlayButton {
      position: absolute;
      top: 50%;
      right: 25px;
      transform: translateY(-50%);
      width: 32px;
      height: 32px;
      background-color: transparent;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      padding: 0;
    }

    #closeOverlayButton::before,
    #closeOverlayButton::after {
      content: '';
      position: absolute;
      width: 22px;
      height: 2.5px;
      background-color: white;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      transform-origin: center;
    }

    #closeOverlayButton::before {
      transform: rotate(45deg) scaleX(1);
    }

    #closeOverlayButton::after {
      transform: rotate(-45deg) scaleX(1);
    }

    #closeOverlayButton:hover {
      transform: translateY(-50%) rotate(90deg);
    }

    #closeOverlayButton:hover::before,
    #closeOverlayButton:hover::after {
      background-color: #ff3b30;
    }

    #closeOverlayButton:active {
      transform: translateY(-50%) rotate(90deg) scale(0.9);
    }

    #closeOverlayButton:active::before {
      transform: rotate(45deg) scaleX(0.85);
    }

    #closeOverlayButton:active::after {
      transform: rotate(-45deg) scaleX(0.85);
    }

    #aiButton, #extractTextButton, #extractQuestionsButton, #helpButton {
      width: 100%; 
      padding: 12px; 
      background: linear-gradient(90deg, #1e3d3d 0%, #1a3333 50%, #1e3d3d 100%);
      background-size: 200% auto;
      color: white; 
      border: none; 
      border-radius: 12px; 
      cursor: pointer; 
      font-size: 16px;
      margin-top: 10px;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    #aiButton:hover, #extractTextButton:hover, #extractQuestionsButton:hover, #helpButton:hover {
      animation: buttonHover 2s infinite;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }

    #aiButton:active, #extractTextButton:active, #extractQuestionsButton:active, #helpButton:active {
      animation: buttonClick 0.2s ease;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    #aiButton::after, #extractTextButton::after, #extractQuestionsButton::after, #helpButton::after {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
      transition: 0.5s;
    }

    #aiButton:hover::after, #extractTextButton:hover::after, #extractQuestionsButton:hover::after, #helpButton:hover::after {
      left: 100%;
    }

    /* Toast notification styling */
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }

    @keyframes glowing {
      0% {
        box-shadow: 0 0 10px rgba(40, 167, 69, 0.4),
                    0 0 20px rgba(40, 167, 69, 0.3),
                    0 0 30px rgba(40, 167, 69, 0.2),
                    0 0 40px rgba(40, 167, 69, 0.1);
      }
      50% {
        box-shadow: 0 0 15px rgba(40, 167, 69, 0.5),
                    0 0 30px rgba(40, 167, 69, 0.4),
                    0 0 45px rgba(40, 167, 69, 0.3),
                    0 0 60px rgba(40, 167, 69, 0.2);
      }
      100% {
        box-shadow: 0 0 10px rgba(40, 167, 69, 0.4),
                    0 0 20px rgba(40, 167, 69, 0.3),
                    0 0 30px rgba(40, 167, 69, 0.2),
                    0 0 40px rgba(40, 167, 69, 0.1);
      }
    }

    @keyframes glowing-error {
      0% {
        box-shadow: 0 0 10px rgba(244, 67, 54, 0.4),
                    0 0 20px rgba(244, 67, 54, 0.3),
                    0 0 30px rgba(244, 67, 54, 0.2),
                    0 0 40px rgba(244, 67, 54, 0.1);
      }
      50% {
        box-shadow: 0 0 15px rgba(244, 67, 54, 0.5),
                    0 0 30px rgba(244, 67, 54, 0.4),
                    0 0 45px rgba(244, 67, 54, 0.3),
                    0 0 60px rgba(244, 67, 54, 0.2);
      }
      100% {
        box-shadow: 0 0 10px rgba(244, 67, 54, 0.4),
                    0 0 20px rgba(244, 67, 54, 0.3),
                    0 0 30px rgba(244, 67, 54, 0.2),
                    0 0 40px rgba(244, 67, 54, 0.1);
      }
    }

    .toast-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10000;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .toast {
      background: rgba(14, 36, 36, 0.95);
      color: white;
      padding: 12px 24px;
      border-radius: 16px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 14px;
      backdrop-filter: blur(8px);
      animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                 glowing 2s ease-in-out infinite;
      min-width: 200px;
      max-width: 400px;
      border: 2px solid rgba(40, 167, 69, 0.5);
      text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
    }

    .toast.success {
      border-left: 4px solid rgba(76, 175, 80, 0.8);
      background: linear-gradient(
        90deg,
        rgba(14, 36, 36, 0.95) 0%,
        rgba(40, 167, 69, 0.15) 100%
      );
    }

    .toast.error {
      border-left: 4px solid rgba(244, 67, 54, 0.8);
      background: linear-gradient(
        90deg,
        rgba(14, 36, 36, 0.95) 0%,
        rgba(244, 67, 54, 0.15) 100%
      );
      animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                 glowing-error 2s ease-in-out infinite;
      border: 2px solid rgba(244, 67, 54, 0.5);
    }

    .toast.sliding-out {
      animation: slideOut 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }

    .toast-icon {
      font-size: 20px;
    }

    #custom-text-extractor-overlay {
      position: fixed;
      top: 80px;
      right: 100px;
      width: 400px;
      height: auto;
      max-height: 400px;
      background-color: rgba(203, 232, 239, 1);
      border: none; /* Removed the white border */
      border-radius: 16px; /* Increased border radius */
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25); /* Enhanced shadow for better depth */
      z-index: 10000;
      font-family: 'Korto', sans-serif;
      overflow: hidden; /* Ensure child elements don't overflow rounded corners */
      cursor: grab;
      opacity: 0;
      transform: translateY(-20px);
      transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                  transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    #custom-text-extractor-overlay.closing {
      opacity: 0;
      transform: translateY(20px) scale(0.95);
      pointer-events: none;
    }

    /* Content area styles */
    .content {
      padding: 20px;
      overflow: visible;
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;     /* Firefox */
    }

    .content::-webkit-scrollbar {
      display: none;  /* Chrome, Safari and Opera */
    }

    @keyframes gradientFlow {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }

    @keyframes modalFadeIn {
      from {
        opacity: 0;
        transform: translate(-50%, -45%) scale(0.95);
        filter: blur(2px);
      }
      to {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
        filter: blur(0);
      }
    }

    @keyframes modalFadeOut {
      from {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
        filter: blur(0);
      }
      to {
        opacity: 0;
        transform: translate(-50%, -55%) scale(0.95);
        filter: blur(2px);
      }
    }

    @keyframes overlayFadeIn {
      from { 
        opacity: 0;
        backdrop-filter: blur(0px);
      }
      to { 
        opacity: 1;
        backdrop-filter: blur(4px);
      }
    }

    @keyframes overlayFadeOut {
      from { 
        opacity: 1;
        backdrop-filter: blur(4px);
      }
      to { 
        opacity: 0;
        backdrop-filter: blur(0px);
      }
    }

    .password-modal {
      display: none;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0.95);
      background: #ffffff !important;
      padding: 35px;
      border-radius: 20px;
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.25);
      z-index: 10001;
      width: 320px;
      text-align: center;
      opacity: 0;
      transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
                  opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                  filter 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      filter: blur(2px);
    }

    .password-modal.visible {
      display: block;
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
      filter: blur(0);
      animation: modalFadeIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    }

    .password-modal.hiding {
      animation: modalFadeOut 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }

    .modal-overlay {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      z-index: 10000;
      opacity: 0;
      transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                  backdrop-filter 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      backdrop-filter: blur(0px);
    }

    .modal-overlay.visible {
      display: block;
      opacity: 1;
      backdrop-filter: blur(4px);
      animation: overlayFadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }

    .modal-overlay.hiding {
      animation: overlayFadeOut 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }

    .password-input {
      width: 100%;
      padding: 14px;
      margin: 20px 0;
      border: 2px solid #e1e1e1;
      border-radius: 12px;
      font-size: 16px;
      outline: none;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      background: #ffffff !important;
      color: #333333;
      transform: translateY(0);
    }

    .password-input:focus {
      border-color: #1e3d3d;
      box-shadow: 0 0 0 4px rgba(30, 61, 61, 0.1);
      background: #ffffff !important;
      transform: translateY(-2px);
    }

    .modal-button {
      padding: 12px 24px;
      margin: 8px;
      border: none;
      border-radius: 12px;
      font-size: 15px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      min-width: 100px;
      transform: translateY(0);
    }

    #submitPassword {
      background: linear-gradient(135deg, #1e3d3d, #428080);
      color: #ffffff;
      font-weight: 600;
      letter-spacing: 0.5px;
      transform: translateY(0);
      transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    #submitPassword:hover {
      background: linear-gradient(135deg, #2a5050, #4f9999);
      transform: translateY(-2px) scale(1.02);
      box-shadow: 0 6px 15px rgba(30, 61, 61, 0.2);
    }

    #submitPassword:active {
      transform: translateY(1px) scale(0.98);
      box-shadow: 0 2px 8px rgba(30, 61, 61, 0.15);
      transition-duration: 0.15s;
    }

    #cancelPassword {
      background: #ffffff;
      color: #495057;
      border: 1px solid #e1e1e1;
      font-weight: 500;
      transform: translateY(0);
      transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    #cancelPassword:hover {
      background: #f8f9fa;
      border-color: #dee2e6;
      transform: translateY(-2px) scale(1.02);
      box-shadow: 0 4px 12px rgba(73, 80, 87, 0.1);
    }

    #cancelPassword:active {
      transform: translateY(1px) scale(0.98);
      box-shadow: 0 2px 6px rgba(73, 80, 87, 0.05);
      transition-duration: 0.15s;
    }

    .modal-title {
      color: #1e3d3d;
      margin-bottom: 15px;
      font-size: 24px;
      font-weight: 600;
      text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
    }

    @keyframes thinking {
        0%, 20% {
            content: ".";
        }
        40% {
            content: "..";
        }
        60%, 100% {
            content: "...";
        }
    }

    @keyframes shake {
      10%, 90% {
        transform: translate(-50%, -50%) translate3d(-1px, 0, 0);
      }
      20%, 80% {
        transform: translate(-50%, -50%) translate3d(2px, 0, 0);
      }
      30%, 50%, 70% {
        transform: translate(-50%, -50%) translate3d(-4px, 0, 0);
      }
      40%, 60% {
        transform: translate(-50%, -50%) translate3d(4px, 0, 0);
      }
    }
  `;
  document.head.appendChild(styleSheet);

  // Add buttons and chat container
  const content = document.createElement("div");
  content.style.padding = "20px";
  content.style.overflow = "visible";

  content.innerHTML = `
    <button id="aiButton" style="
      width: 100%; 
      padding: 10px; 
      background: linear-gradient(90deg, #1e3d3d 0%, #1a3333 50%, #1e3d3d 100%);
      background-size: 200% auto;
      color: white; 
      border: none; 
      border-radius: 12px; 
      cursor: pointer; 
      font-size: 16px;
      display: flex; 
      align-items: center; 
      justify-content: center;
      transition: all 0.3s ease;
    ">
      Tutor
    </button>
    <button id="extractTextButton" style="
      width: 100%; 
      padding: 10px; 
      background: linear-gradient(90deg, #1e3d3d 0%, #1a3333 50%, #1e3d3d 100%);
      background-size: 200% auto;
      color: white; 
      border: none; 
      border-radius: 12px; 
      cursor: pointer; 
      font-size: 16px;
      margin-top: 10px;
      transition: all 0.3s ease;
    ">Extract Text</button>
    <button id="answerButton" style="
      width: 100%; 
      padding: 10px; 
      background: linear-gradient(90deg, #1e3d3d 0%, #1a3333 50%, #1e3d3d 100%);
      background-size: 200% auto;
      color: white; 
      border: none; 
      border-radius: 12px; 
      cursor: pointer; 
      font-size: 16px; 
      margin-top: 10px;
      transition: all 0.3s ease;
    ">Answer</button>
    <button id="copyQuestionsButton" style="
      width: 100%; 
      padding: 10px; 
      background: linear-gradient(90deg, #1e3d3d 0%, #1a3333 50%, #1e3d3d 100%);
      background-size: 200% auto;
      color: white; 
      border: none; 
      border-radius: 12px; 
      cursor: pointer; 
      font-size: 16px; 
      margin-top: 10px;
      transition: all 0.3s ease;
    ">Copy Questions (Manual)</button>
    <button id="helpButton" style="
      width: 100%; 
      padding: 10px; 
      background: linear-gradient(90deg, #1e3d3d 0%, #1a3333 50%, #1e3d3d 100%);
      background-size: 200% auto;
      color: white; 
      border: none; 
      border-radius: 12px; 
      cursor: pointer; 
      font-size: 16px; 
      margin-top: 10px; 
      display: flex; 
      align-items: center; 
      justify-content: center;
      transition: all 0.3s ease;
    ">
      Help
      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAMAAADzN3VRAAAAUVBMVEVHcEwAAAABAQEAAAAICAgCAgIFBQUEBAQFBQUBAQEDAwMBAQECAgIAAAAAAAALCwsDAwMBAQECAgIAAAACAgIDAwMBAQEDAwMBAQEEBAQCAgKC4hCIAAAAG3RSTlMA/sHkDGsVHSSyQtei+OsEY5c333VJjSzIMXyexvrBAAABCUlEQVQoz32S27KDIAxF2UEU5KIUa9vz/x96Ei6jD53mgUG2yQo7KNViMU4D0M4s6h7z4aOmkAPp6I/5Eh4E2u3Eu8nuvH8M4VmSkWO1bSKaVJ49o5RVSHtw7lxZXEupWTMlEdY3JGJmyppIWAcMr9YD7zPzmjnL4OAinoRxAoH/e3mkD7PIL8rEXdhn8R+pnQHB79Eop62cTIvdKhRRqFY7pWux4UQA6vdEWiFcgiWgFVUBCvnyiAVqAvPuOQZww0/OuXFCo6vO6b1JnIVGivTW7tM4dln6Vu7TPZD4o4GpHnTfxAeH9Bq9HJfXlfNuzO71mI84NFfOmM9tpk2/ZvrjHfx4O1/f2z86VwtdMD5yeAAAAABJRU5ErkJggg==" 
        alt="Help Icon" style="
        margin-left: 8px; 
        width: 20px; 
        height: 20px;
        transition: transform 0.3s ease;
        filter: brightness(0) invert(1);
      " />
    </button>
    <div id="chatContainer" class="chat-container">
      <div class="chat-messages" id="chatMessages"></div>
      <div class="chat-input-container">
        <textarea 
               class="chat-input" 
               id="chatInput" 
               placeholder="Type your message..." 
               rows="1"
               autocomplete="off" 
               autocapitalize="off" 
               spellcheck="false" 
               data-form-type="other"></textarea>
        <button class="send-button" id="sendMessage">Send</button>
      </div>
    </div>
  `;

  // Add hover effects to all buttons
  const buttons = overlay.querySelectorAll('button');
  buttons.forEach(button => {
    if (button.id !== 'closeOverlayButton') {  // Don't apply to close button
      button.addEventListener('mouseenter', () => {
        button.classList.add('button-hover');
      });
      button.addEventListener('mouseleave', () => {
        button.classList.remove('button-hover');
      });
      button.addEventListener('mousedown', () => {
        button.style.transform = 'scale(0.95)';
      });
      button.addEventListener('mouseup', () => {
        button.style.transform = 'scale(1)';
      });
    }
  });

  // Add a message area for success messages
  const messageArea = document.createElement("div");
  messageArea.id = "successMessage";
  messageArea.style.marginTop = "15px";
  messageArea.style.textAlign = "center";
  messageArea.style.color = "green";
  messageArea.style.fontWeight = "bold";
  messageArea.style.fontSize = "14px";
  messageArea.style.visibility = "hidden";
  messageArea.style.opacity = "0";
  messageArea.style.transition = "opacity 0.3s ease";
  content.appendChild(messageArea);

  overlay.appendChild(content);
  document.body.appendChild(overlay);

  // Make the overlay draggable
  makeOverlayDraggable(overlay, header);

  // Close button functionality
  closeButton.addEventListener("click", () => {
    const overlay = document.getElementById("custom-text-extractor-overlay");
    overlay.style.opacity = "0";
    overlay.style.transform = "translateY(20px) scale(0.95)";
    setTimeout(() => {
    overlay.remove();
    }, 300);
  });

  // Add event listeners for the buttons
  document.getElementById("extractTextButton").addEventListener("click", async () => {
    try {
      const extractedText = extractText();
      await navigator.clipboard.writeText(extractedText + "\n\n");  // Add 2 new lines at the end
      showSuccessMessage("Reading text copied to clipboard!");
    } catch (error) {
      console.error("Error extracting and copying text:", error);
      showSuccessMessage("Error: Could not copy text.", true);
    }
  });

  document.getElementById("answerButton").addEventListener("click", async () => {
    try {
      const chatContainer = document.getElementById("chatContainer");
      const chatInput = document.getElementById("chatInput");
      const aiButton = document.getElementById("aiButton");
      const sendButton = document.getElementById("sendMessage");

      // Open chat if not visible
      if (chatContainer.style.display !== "block") {
        aiButton.click();
      }

      // Paste clipboard content
      let clipboardText = "";
      try {
        clipboardText = await navigator.clipboard.readText();
      } catch (e) {
        clipboardText = "";
      }
      chatInput.value = clipboardText ? clipboardText + "\n\n" : "";

      // Extract and append questions
      const questionsAndAnswers = extractQuestions();
      if (questionsAndAnswers) {
        // Preserve any existing text from the clipboard
        let existingText = chatInput.value.trim();
        
        // Format the text properly
        if (existingText && !existingText.endsWith('\n')) {
          existingText += '\n\n';
        }
        
        // Add new questions
        chatInput.value = existingText + questionsAndAnswers;
        chatInput.style.height = 'auto';
        chatInput.style.height = Math.min(chatInput.scrollHeight, 120) + 'px';
        chatInput.focus();
        showSuccessMessage("Questions loaded - proceeding with answers!");
        
        // Simulate pressing Enter to send the message
        if (chatInput.value.trim().length > 0) {
          // Trigger the send button click
          sendButton.click();
          // Try to click 'Continue' as soon as it appears, for up to 5 seconds
          let attempts = 0;
          const maxAttempts = 25; // 25 x 200ms = 5 seconds
          const tryClickContinue = () => {
            // Look for a visible button or element with text or aria-label 'Continue' or 'Next'
            const candidates = Array.from(document.querySelectorAll('button, a, [role="button"], input[type="button"], [class*="continue"], [class*="next"]'));
            for (const el of candidates) {
              const text = (el.textContent || el.value || '').trim().toLowerCase();
              const aria = (el.getAttribute('aria-label') || '').trim().toLowerCase();
              if (el.offsetParent !== null && (
                /continue|next|forward|proceed/i.test(text) || 
                /continue|next|forward|proceed/i.test(aria) ||
                /continue|next|forward|proceed/i.test(el.className)
              )) {
                el.click();
                showSuccessMessage("Moving to next question...");
                return;
              }
            }
            if (++attempts < maxAttempts) {
              setTimeout(tryClickContinue, 200);
            }
          };
          setTimeout(tryClickContinue, 1200); // Start after a short delay
        }
      } else {
        showSuccessMessage("No questions found to answer.", true);
      }
    } catch (error) {
      showSuccessMessage("Error: Could not complete the answer process.", true);
    }
  });

  document.getElementById("helpButton").addEventListener("click", () => {
    window.open(chrome.runtime.getURL("help.html"), "_blank");
  });

  document.getElementById("copyQuestionsButton").addEventListener("click", async () => {
    try {
      const questionsAndAnswers = extractQuestions();
      if (!questionsAndAnswers) {
        showSuccessMessage("No questions/answers found.", true);
        return;
      }
      await navigator.clipboard.writeText(questionsAndAnswers);
      showSuccessMessage("Questions copied to clipboard!");
    } catch (error) {
      console.error("Error extracting questions:", error);
      showSuccessMessage("Error: Could not copy questions.", true);
    }
  });

  // Add chat functionality
  const chatInput = document.getElementById("chatInput");
  const sendButton = document.getElementById("sendMessage");
  const chatMessages = document.getElementById("chatMessages");

  function addMessage(text, isUser = false) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Add this constant at the top of the file
  const DEFAULT_API_KEY = ""; // OpenAI API key should be provided by the user

  // Update the AI button click handler
  document.getElementById("aiButton").addEventListener("click", async () => {
    try {
      const chatContainer = document.getElementById("chatContainer");
      const chatMessages = document.getElementById("chatMessages");
      const isVisible = chatContainer.style.display === "block";
      
      if (!isVisible) {
        // Clear previous chat messages and reset session
        chatMessages.innerHTML = '';
        
        chatContainer.style.display = "block";
        overlay.style.maxHeight = "700px";
        overlay.style.transition = "max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
        
        // Remove closing class if it exists
        chatContainer.classList.remove("closing");
        
        // Trigger animation after a small delay to ensure display: block has taken effect
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            chatContainer.classList.add("visible");
          });
        });
        
        // Add greeting message
        addMessage("Hi! I'm your Sparx Tutor. What would you like help with?", false);
      } else {
        // Start closing animation
        chatContainer.classList.add("closing");
        chatContainer.classList.remove("visible");
        overlay.style.maxHeight = "400px";
        
        // Wait for the animation to complete before hiding and clearing
        setTimeout(() => {
        chatContainer.style.display = "none";
          chatContainer.classList.remove("closing");
          chatMessages.innerHTML = ''; // Clear messages when hiding
        }, 300);
      }
    } catch (error) {
      console.error("Error:", error);
      showSuccessMessage("Error: Could not process the request.", true);
    }
  });

  // Update the handleSendMessage function
  async function handleSendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;

    // Add user message to chat
    addMessage(message, true);
    
    // Reset input
    chatInput.value = '';
    chatInput.style.height = 'auto';
    
    try {
      // Show thinking state with animation
      const thinkingMessage = document.createElement("div");
      thinkingMessage.className = "message ai-message";
      thinkingMessage.innerHTML = "Thinking<span class='thinking-dots'></span>";
      chatMessages.appendChild(thinkingMessage);
      chatMessages.scrollTop = chatMessages.scrollHeight;
      
      // Send request to Python server
      const response = await fetch('http://localhost:5000/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: 'chat',
          message: message
        })
      });
      
      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }
      
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || "Server request failed");
      }
      
      // Remove the thinking message
      chatMessages.removeChild(thinkingMessage);
      addMessage(data.data, false);

      // AUTOMATION: Automatically select the correct answer on the page if the AI gives an answer
      if (typeof data.data === 'string' && data.data.length > 0) {
        const answer = data.data.trim();
        // Try to find and click the answer button/option on the page
        // Common selectors for answer options
        const possibleSelectors = [
          '[class*="choice"]', '[class*="option"]', '[class*="answer"]',
          'button', 'input[type="radio"]', 'label', '[role="option"]'
        ];
        let found = false;
        for (const selector of possibleSelectors) {
          const elements = Array.from(document.querySelectorAll(selector));
          for (const el of elements) {
            // Check if the element's text matches the answer (case-insensitive, trimmed)
            if (el.textContent && el.textContent.trim().toLowerCase() === answer.toLowerCase()) {
              el.scrollIntoView({ behavior: 'smooth', block: 'center' });
              setTimeout(() => {
                el.click();
              }, 500); // Give time for scroll
              showSuccessMessage(`Auto-selected answer: ${answer}`);
              found = true;
              break;
            }
            // For radio/checkbox inputs, try matching value or aria-label
            if ((el.value && el.value.trim().toLowerCase() === answer.toLowerCase()) ||
                (el.getAttribute('aria-label') && el.getAttribute('aria-label').trim().toLowerCase() === answer.toLowerCase())) {
              el.scrollIntoView({ behavior: 'smooth', block: 'center' });
              setTimeout(() => {
                el.click();
              }, 500);
              showSuccessMessage(`Auto-selected answer: ${answer}`);
              found = true;
              break;
            }
          }
          if (found) break;
        }
        if (!found) {
          showSuccessMessage(`AI answered: ${answer} (but could not auto-select on page)`, true);
        }
      }
    } catch (error) {
      console.error("Error:", error);
      // Remove the thinking message if it exists
      const thinkingMessage = chatMessages.querySelector(".thinking-dots");
      if (thinkingMessage) {
        thinkingMessage.parentElement.remove();
      }
      addMessage("I'm having trouble connecting to the server. Please make sure the Python server is running.", false);
    }
  }

  sendButton.addEventListener("click", handleSendMessage);
  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  });

  // Create password modal
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'modal-overlay';
  document.body.appendChild(modalOverlay);

  const passwordModal = document.createElement('div');
  passwordModal.className = 'password-modal';
  passwordModal.innerHTML = `
    <h2 class="modal-title">Enter Product Key</h2>
    <input type="password" 
           class="password-input" 
           placeholder="Enter your Key"
           autocomplete="current-password">
    <div style="display: flex; justify-content: center; gap: 10px;">
      <button class="modal-button" id="submitPassword">Submit</button>
      <button class="modal-button" id="cancelPassword">Cancel</button>
    </div>
  `;
  document.body.appendChild(passwordModal);

  // Event listeners for lock system
  lockButton.addEventListener('click', () => {
    if (!isLocked) {
      lockInterface();
    } else {
      showPasswordModal();
    }
  });

  modalOverlay.addEventListener('click', hidePasswordModal);

  passwordModal.querySelector('#cancelPassword').addEventListener('click', hidePasswordModal);

  passwordModal.querySelector('#submitPassword').addEventListener('click', async () => {
    const passwordInput = passwordModal.querySelector('.password-input');
    
    // Show immediate notification that we're validating
    showSuccessMessage("Validating license key...");
    
    const result = await validateLicense(passwordInput.value);
    
    if (result.valid) {
      currentLicenseKey = passwordInput.value;
      unlockInterface();
      hidePasswordModal();
      showSuccessMessage(`License activated! Expires in ${result.formatted_expiry}.`);
    } else {
      showSuccessMessage("License key has expired", true);
      passwordInput.value = '';
      
      passwordModal.style.animation = 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both';
      setTimeout(() => {
        passwordModal.style.animation = '';
      }, 500);
    }
  });

  passwordModal.querySelector('.password-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      passwordModal.querySelector('#submitPassword').click();
    }
  });

  // Prevent modal from closing when clicking inside it
  passwordModal.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  // Add auto-resize functionality for the textarea
  chatInput.addEventListener('input', function() {
    this.style.height = 'auto';
    const newHeight = Math.min(this.scrollHeight, 120);
    this.style.height = newHeight + 'px';
  });
}

// Function to show success or error messages
function showSuccessMessage(message, isError = false) {
  // Remove any existing toasts first
  const existingToasts = document.querySelectorAll('.toast');
  existingToasts.forEach(toast => {
    toast.remove();
  });

  // Create toast container if it doesn't exist
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  // Create and show new toast immediately
  const toast = document.createElement('div');
  toast.className = `toast ${isError ? 'error' : 'success'}`;

  const icon = document.createElement('span');
  icon.className = 'toast-icon';
  icon.innerHTML = isError ? '❌' : '✅';
  toast.appendChild(icon);

  const messageSpan = document.createElement('span');
  messageSpan.textContent = message;
  toast.appendChild(messageSpan);

  // Add to container and show immediately
  requestAnimationFrame(() => {
    toastContainer.appendChild(toast);
    // Force a reflow to ensure the animation plays
    void toast.offsetWidth;
  });

  // Remove after delay
  const delay = message.includes('expires') ? 5000 : 3000;
  setTimeout(() => {
    toast.classList.add('sliding-out');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.remove();
        // Remove container if empty
        if (toastContainer.children.length === 0) {
          toastContainer.remove();
        }
      }
    }, 300);
  }, delay);
}

// Function to make the overlay draggable
function makeOverlayDraggable(overlay, header) {
  let isDragging = false;
  let startX, startY, initialX, initialY;

  header.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    initialX = parseInt(overlay.style.right) || 100;
    initialY = parseInt(overlay.style.top) || 50;
    overlay.style.cursor = "grabbing";
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const dx = startX - e.clientX;
    const dy = startY - e.clientY;

    overlay.style.right = `${initialX + dx}px`;
    overlay.style.top = `${initialY - dy}px`;
  });

  document.addEventListener("mouseup", () => {
    if (isDragging) {
      isDragging = false;
      overlay.style.cursor = "grab";
    }
  });
}

// Function to extract the reading text between "Start reading here" and "Stop reading here"
function extractText() {
  const selectors = [
    "#book-scroll > div > div > div.read-content",
    ".read-content",
    ".content",
    ".text-content",
    "[class*='content']",
    "main",
    "article",
    ".main-content"
  ];

  for (const selector of selectors) {
    const container = document.querySelector(selector);
    if (container) {
      const text = container.textContent.trim();
      // Look for the most relevant paragraph that might contain the answer
      const paragraphs = text.split(/\n\s*\n/);
      
      // Try to find a paragraph that contains answer-related content
      for (const para of paragraphs) {
        const cleanPara = para.trim();
        if (cleanPara.length > 20) {  // Only consider substantial paragraphs
          return cleanPara;
        }
      }
      
      // If no suitable paragraph found, return the full text
      return text;
    }
  }
  return "";
}

// Function to extract questions and their answers
function extractQuestions() {
  // Common question container selectors
  const selectors = [
    // Sparx specific selectors
    '[data-test="question-container"]',
    '[data-component="Question"]',
    '.sparx-question',
    '.homework-question',
    '.PanelPaperbackQuestionContainer',
    '.question-container',
    '.questionContainer',
    // Generic question selectors
    '[class*="question"]',
    '[id*="question"]',
    // Content selectors
    '.read-content',
    '.content',
    '.text-content',
    '[class*="content"]'
  ];

  // Common question identifiers
  const questionIdentifiers = [
    /Q(?:uestion)?\s*\d+/i,  // Matches Q1, Question 1, etc.
    /\b\d+\s*[\.\)]\s*[A-Z]/,  // Matches numbered questions like "1. What" or "1) What"
    /\b[A-Z]\s*[\.\)]\s*/,  // Matches lettered options like "A. " or "A) "
    /\bPart\s+[A-Z1-9]\b/i,  // Matches "Part A", "Part 1", etc.
    /\[\s*\d+\s*marks?\s*\]/i  // Matches "[3 marks]", etc.
  ];

  let extractedContent = "";
  let foundQuestion = false;

  // Try each selector
  for (const selector of selectors) {
    const containers = Array.from(document.querySelectorAll(selector));
    
    for (const container of containers) {
      let text = container.textContent.trim();
      
      // Skip if text is too short
      if (text.length < 10) continue;

      // Check if this looks like a question
      const hasQuestionIdentifier = questionIdentifiers.some(pattern => pattern.test(text));
      const hasQuestionMark = text.includes('?');
      const startsWithCapital = /^[A-Z]/.test(text);
      
      if (hasQuestionIdentifier || (hasQuestionMark && startsWithCapital)) {
        foundQuestion = true;
        
        // Clean up the text
        text = text
          .replace(/\s+/g, ' ')  // Replace multiple spaces with single space
          .replace(/[\n\r]+/g, '\n')  // Normalize line breaks
          .replace(/^\d+[\.\)]\s*/gm, '')  // Remove leading numbers
          .replace(/^[A-Z][\.\)]\s*/gm, '')  // Remove leading letters
          .trim();

        // Look for answer choices
        const answerChoices = container.querySelectorAll('[class*="choice"], [class*="option"], [class*="answer"]');
        if (answerChoices.length > 0) {
          text += '\n\nAnswer choices:\n';
          answerChoices.forEach((choice, index) => {
            text += `${String.fromCharCode(65 + index)}. ${choice.textContent.trim()}\n`;
          });
        }

        // Add to extracted content with spacing
        extractedContent += text + '\n\n---\n\n';
      }
    }
  }

  // If no questions found through normal means, try looking for question-like text
  if (!foundQuestion) {
    const bodyText = document.body.textContent;
    const questionMatches = bodyText.match(/[A-Z][^.!?]*\?/g);
    
    if (questionMatches) {
      extractedContent = questionMatches.join('\n\n---\n\n');
      foundQuestion = true;
    }
  }

  // Show message if no questions found
  if (!foundQuestion || !extractedContent.trim()) {
    showSuccessMessage("No questions found on this page.", true);
    return null;
  }

  return extractedContent.trim();
}

// Function to extract the user's name from the webpage
function extractUserName() {
  const nameElement = document.querySelector('span[data-sentry-mask="true"]');
  if (nameElement) {
    const fullName = nameElement.textContent.trim();
    // Remove any extra whitespace and normalize the name
    return fullName.replace(/\s+/g, ' ');
  }
  return null;
}

// Inject the overlay UI
createOverlayUI();
