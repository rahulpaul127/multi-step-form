# Frontend Mentor - Multi-step form

This is a solution to the [Multi-step form challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/multistep-form-YVAnSdqQBJ).

## Table of contents

- [Overview](#overview)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

---

## Overview

### Screenshot

| ![Desktop design](./design/desktop-design-step-1.jpg) | ![Mobile design](./design/mobile-design-step-1.jpg) |
| :--: | :--: |
| Desktop | Mobile |

### Links

- Solution URL: [Frontend Mentor](https://www.frontendmentor.io/solutions/multi-step-form--ruoyoTq09)
- Live Site URL: [GitHub Pages](https://github.com/rahulpaul127/multi-step-form)

---

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties (design tokens)
- CSS Flexbox & CSS Grid
- Responsive workflow (Desktop & Mobile viewports)
- Vanilla JavaScript (state-driven UI)
- Regex for custom form validation

### What I learned

- Implementing a **state-driven architecture in Vanilla JavaScript**. Similar to modern frameworks, the application maintains a centralized `state` object that tracks the current step, selected plan, billing cycle, and add-ons. Whenever the user interacts with the form, the state updates and a single `render()` function selectively updates the DOM.
- Advanced **Form Validation** with Regex. I learned how to build custom JavaScript form validation to ensure the name field strictly accepts letters/spaces and the phone number field strictly accepts valid numerical/symbol inputs, improving data integrity before moving to the next step.
- Writing robust **CSS Layouts** with Flexbox and Grid. I used CSS Grid for the overall application shell to manage the sidebar and main content area. I refined the alignment by placing the main app container inside a `display: flex` body to prevent "layout shift" bugs on refresh (which can happen with CSS Grid in certain browsers) and perfectly centered the inner form fields horizontally and vertically using a responsive `1fr` track.
- Separation of concerns by abstracting inline styles and scripts into dedicated `style.css` and `script.js` files, aligning with industry standards for maintainability.

### Continued development

- Add the deployed live links after publishing the project to GitHub Pages.
- Add smoother CSS transitions and micro-animations when switching between form steps or toggling the billing switch.
- Enhance accessibility by adding dynamic ARIA live regions that announce step changes to screen readers.

## Author

- Frontend Mentor - [@rahulpaul127](https://www.frontendmentor.io/profile/rahulpaul127)
- Twitter - [@rahulpaul127](https://x.com/rahulpaul127)
