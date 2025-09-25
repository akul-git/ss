document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll("#verticalTabs a");
  const panels = document.querySelectorAll(".tab-content");

  function activateTab(tab) {
    // Hide all panels
    panels.forEach(panel => panel.classList.add("hidden"));

    // Reset all tabs
    tabs.forEach(t => {
      t.setAttribute("aria-selected", "false");
      t.setAttribute("tabindex", "-1");
      t.classList.remove("bg-gray-100", "font-semibold","ml-4");
    });

    // Activate selected tab
    const targetId = tab.getAttribute("href");
    const targetPanel = document.querySelector(targetId);
    if (targetPanel) targetPanel.classList.remove("hidden");

    tab.setAttribute("aria-selected", "true");
    tab.setAttribute("tabindex", "0");
    tab.classList.add("bg-gray-100", "font-semibold","rounded-l-3xl","ml-4");
    tab.focus();
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", e => {
      e.preventDefault();
      activateTab(tab);
    });

    tab.addEventListener("keydown", e => {
      const index = Array.from(tabs).indexOf(tab);
      if (e.key === "ArrowDown") {
        e.preventDefault();
        const next = tabs[index + 1] || tabs[0];
        activateTab(next);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const prev = tabs[index - 1] || tabs[tabs.length - 1];
        activateTab(prev);
      }
    });
  });

  // Activate first tab by default
  if (tabs.length > 0) activateTab(tabs[0]);
});