import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import {getOnlyVisible, getClickable,
  getNotVisible, setNarrow} from './common';
import App from '../App';

/**
 * Button to toggle visibility of the mailbox selection drawer
 * should be visible and clickable. Requires a single element to
 * have an aria-label attribute of "toggle drawer"
 */
test('Toggle Drawer Clickable', async () => {
  render(<App />);
  setNarrow();
  getClickable('toggle drawer');
});

/**
 * Initially the drawer is not shown, hence the Inbox and Trash
 * buttons are invisible. After clicking the toggle button, both
 * become visible. Requires a single element to have an
 * aria-label attribute of "toggle drawer".
 */
test('Open then close Drawer', async () => {
  render(<App />);
  setNarrow();
  getNotVisible('Inbox');
  getNotVisible('Trash');
  fireEvent.click(getClickable('toggle drawer'));
  getOnlyVisible('Inbox');
  getOnlyVisible('Trash');
});

/**
 * Initially the mail reader is not shown. After clicking an email
 * the reader becomes visible. After to close the reader, it becomes
 * invisible. Requires a single element to have an aria-label
 * attribute of "close mobile reader".
 */
test('Open and Close Mail Reader', async () => {
  render(<App />);
  setNarrow();
  getNotVisible('close mobile reader');
  getNotVisible('Subject: Fancy a brew tonight?');
  fireEvent.click(getOnlyVisible('Bob Dylan'));
  getOnlyVisible('Subject: Fancy a brew tonight?');
  getOnlyVisible('To: App User (user@app.com)');
  getOnlyVisible('From: Bob Dylan (bob@bob.com)');
  fireEvent.click(getClickable('close mobile reader'));
  getNotVisible('Subject: Fancy a brew tonight?');
});

/**
 * Open the drawer to select Trash then again to select Inbox.
 * Requires a single element to have an aria-label attribute of
 * "toggle drawer".
 */
test('Select Trash then Inbox', async () => {
  render(<App />);
  setNarrow();
  fireEvent.click(getClickable('toggle drawer'));
  fireEvent.click(getOnlyVisible('Trash'));
  getOnlyVisible('CSE183 Mail - Trash');
  fireEvent.click(getClickable('toggle drawer'));
  fireEvent.click(getOnlyVisible('Inbox'));
  getOnlyVisible('CSE183 Mail - Inbox');
});
