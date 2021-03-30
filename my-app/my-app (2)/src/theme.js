const size = {
  desktop: "1920px",
  tablet:"1700px",
  container : "1436px",
  mobile: "1024px",
  loginRow: "710px",
}

export default function theme() {
  return {
    desktop: `(max-width: ${size.desktop})`,
    tablet: `(max-width: ${size.tablet})`,
    container: `(max-width: ${size.container})`,
    mobile: `(max-width: ${size.mobile})`,
    loginRow: `(max-width: ${size.loginRow})`,
  }
}
