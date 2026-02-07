import { useEffect } from "react";

export const useSecurity = () => {
  useEffect(() => {
    // Disable right-click
    const handleContextMenu = (e: Event) => {
      e.preventDefault();
      return false;
    };

    // Disable keyboard shortcuts for dev tools
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.key === "F12") {
        e.preventDefault();
        return false;
      }
      // Ctrl+Shift+I (Inspect)
      if (e.ctrlKey && e.shiftKey && e.key === "I") {
        e.preventDefault();
        return false;
      }
      // Ctrl+Shift+J (Console)
      if (e.ctrlKey && e.shiftKey && e.key === "J") {
        e.preventDefault();
        return false;
      }
      // Ctrl+Shift+C (Inspect Element)
      if (e.ctrlKey && e.shiftKey && e.key === "C") {
        e.preventDefault();
        return false;
      }
      // Ctrl+U (View Source)
      if (e.ctrlKey && e.key === "u") {
        e.preventDefault();
        return false;
      }
      // Ctrl+S (Save)
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        return false;
      }
      // Ctrl+P (Print)
      if (e.ctrlKey && e.key === "p") {
        e.preventDefault();
        return false;
      }
    };

    // Disable copy, cut, paste
    const disableCopy = (e: Event) => {
      e.preventDefault();
      return false;
    };

    // Disable drag
    const disableDrag = (e: Event) => {
      e.preventDefault();
      return false;
    };

    // Console warnings
    console.clear();
    const style1 = "color: #C9A227; font-size: 24px; font-weight: bold;";
    const style2 = "color: #ff6b6b; font-size: 16px; font-weight: bold;";
    console.log("%c⚠️ WARNING ⚠️", style1);
    console.log("%cThis site is protected. Unauthorized access is prohibited.", style2);
    console.log("%c© Ali Krayem - All Rights Reserved", style1);

    // Add event listeners
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("copy", disableCopy);
    document.addEventListener("cut", disableCopy);
    document.addEventListener("paste", disableCopy);
    document.addEventListener("dragstart", disableDrag);

    // Cleanup
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("copy", disableCopy);
      document.removeEventListener("cut", disableCopy);
      document.removeEventListener("paste", disableCopy);
      document.removeEventListener("dragstart", disableDrag);
    };
  }, []);
};

export default useSecurity;
