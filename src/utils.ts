
export function setAppHeight() {
  document.documentElement.style.setProperty(
    "--app-height",
    `${window.innerHeight}px`
  );
}

export function setAppWidth() {
  document.documentElement.style.setProperty(
    "--app-width",
    `${window.innerWidth}px`
  );
}

export function setStyleProperty(name: string, value: string) {
  document.documentElement.style.setProperty(
    name,
    value
  );
}

export function removeStyleProperty(name: string) {
  document.documentElement.style.removeProperty(
    name
  );
}
