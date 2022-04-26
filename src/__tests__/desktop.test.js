import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import {getOnlyVisible, getClickable,
  getManyVisible, getAnyVisible, getNotVisible} from './common';
import App from '../App';

/**
 * Button to toggle visibility of the mailbox selection drawer
 * should not be visible. Requires a single element to have an
 * aria-label attribute of "toggle drawer"
 */
test('Toggle Draw Not Visible', async () => {
  render(<App />);
  getNotVisible('toggle drawer');
});
/**
 * Default title is correct.
 */
test('Title Visible', async () => {
  render(<App />);
  getOnlyVisible('CSE183 Mail - Inbox');
});
/**
 * Button to select the Inbox mailbox is visible.
 */
test('Inbox Button Visible', async () => {
  render(<App />);
  getOnlyVisible('Inbox');
});
/**
 * Button to select the Trash mailbox is visible.
 */
test('Trash Button Visible', async () => {
  render(<App />);
  getOnlyVisible('Trash');
});
/**
 * Selecting the Trash mailbox changes the title appropriately.
 */
test('Select Trash', async () => {
  render(<App />);
  fireEvent.click(getOnlyVisible('Trash'));
  getOnlyVisible('CSE183 Mail - Trash');
});
/**
 * Selecting the Inbox mailbox changes the title appropriately.
 */
test('Select Inbox', async () => {
  render(<App />);
  fireEvent.click(getOnlyVisible('Inbox'));
  getOnlyVisible('CSE183 Mail - Inbox');
});
/**
 * Selecting alternate mailboxes changes the title to indicate
 * the currently selected mailbox.
 */
test('Select Trash then Inbox', async () => {
  render(<App />);
  fireEvent.click(getOnlyVisible('Trash'));
  fireEvent.click(getOnlyVisible('Trash')); // For Branch Coverage
  getOnlyVisible('CSE183 Mail - Trash');
  fireEvent.click(getOnlyVisible('Inbox'));
  getOnlyVisible('CSE183 Mail - Inbox');
});

/**
 * One Inbox email from Bob Dylan received today at 9:30am.
 * Time should be zero padded to "09:30".
 */
test('Inbox - Bob Dylan', async () => {
  render(<App />);
  fireEvent.click(getOnlyVisible('Inbox'));
  getClickable('Bob Dylan Fancy a brew tonight?');
  getOnlyVisible('09:30');
});
/**
 * One Inbox email from Loren Chainey received on October 08.
 * Date should be abbreviated and zero padded to "Oct 08".
 */
test('Inbox - Loren Chainey', async () => {
  render(<App />);
  fireEvent.click(getOnlyVisible('Inbox'));
  getClickable('Loren Chainey Green Fish (Chorok mulkogi)');
  getOnlyVisible('Oct 08');
});
/**
 * One Trash email from Big Bird.
 */
test('Trash - Big Bird', async () => {
  render(<App />);
  fireEvent.click(getOnlyVisible('Trash'));
  getClickable('Big Bird Have you seen my car keys??');
});
/**
 * Two Inbox emails reveived on October 16. Date should be
 * abbreviated to "Oct 16".
 */
test('Inbox - Oct 16 x 2', async () => {
  render(<App />);
  fireEvent.click(getOnlyVisible('Inbox'));
  getManyVisible('Oct 16', 2);
});
/**
 * Two Trash emails received on August 8. Date should be
 * abbreviated and zero padded to "Aug 08".
 */
test('Trash - Aug 08 x 2', async () => {
  render(<App />);
  fireEvent.click(getOnlyVisible('Trash'));
  getManyVisible('Aug 08', 2);
});
/**
 * Clicking on a mailbox item shows the desktop viewer with details
 * of the clicked email. On clicking to close the viewer, the email
 * details are no longer visible. Requires a single element to have
 * an aria-label attribute of "close desktop reader".
 */
test('Mail Viewer - Shows and closes on click', async () => {
  render(<App />);
  fireEvent.click(getOnlyVisible('Bob Dylan'));
  getAnyVisible('Subject: Fancy a brew tonight?');
  getAnyVisible('To: App User (user@app.com)');
  getAnyVisible('From: Bob Dylan (bob@bob.com)');
  fireEvent.click(getClickable('close desktop reader'));
  getNotVisible('close desktop reader');
  getNotVisible('Subject: Fancy a brew tonight?');
});
/**
 * Clicking on a mailbox item shows the desktop viewer. On pressing
 * 'Esc' to close the viewer, the email details are no longer visible.
 * Requires a single element to have an aria-label attribute of
 * "close desktop reader".
 */
test('Mail Viewer - Shows and closes on "Esc"', async () => {
  render(<App />);
  fireEvent.click(getOnlyVisible('Bob Dylan'));
  getClickable('close desktop reader');
  fireEvent.keyDown(global, {code: 'KeyA'}); // For Branch Coverage
  fireEvent.keyDown(global, {code: 'Escape'});
  getNotVisible('close desktop reader');
});
