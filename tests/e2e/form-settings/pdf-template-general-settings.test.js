import { Selector } from 'testcafe'
import { fieldLabel, fieldDescription, listItem, button } from '../page-model/helpers/field'
import FormSettings from '../page-model/form-settings/form-settings'

const run = new FormSettings()

fixture`PDF Template - General Settings Test`

test('should display Name field', async t => {
  // Get selectors
  const nameInputField = Selector('#gfpdf_settings\\[name\\]')

  // Actions
  await run.navigateSettingsTab('gf_edit_forms')

  // Assertions
  await t
    .expect(fieldLabel('Name').exists).ok()
    .expect(nameInputField.exists).ok()
})

test('should display Template field', async t => {
  // Get selectors
  const selectBox = Selector('div').find('[class^="chosen-container chosen-container-single chosen-container-single-nosearch"][id="gfpdf_settings_template__chosen"]')
  const templatePopupBox = Selector('div').find('[class^="container theme-wrap"]')

  // Actions
  await run.navigateSettingsTab('gf_edit_forms')
  await t.click(button('Advanced'))

  // Assertions
  await t
    .expect(fieldLabel('Template').exists).ok()
    .expect(selectBox.exists).ok()
    .expect(button('Advanced').exists).ok()
    .expect(fieldDescription('Choose an existing template or purchased more from our template shop. You can also build your own or hire us to create a custom solution.').exists).ok()
    .expect(templatePopupBox.exists).ok()
})

test('should display Notifications field', async t => {
  // Get selectors
  const notificationSelectBox = Selector('div').find('[class^="chosen-container chosen-container-multi"][id="gfpdf_settings_notification__chosen"]')

  // Actions
  await run.navigateSettingsTab('gf_edit_forms')

  // Assertions
  await t
    .expect(fieldLabel('Notifications').exists).ok()
    .expect(notificationSelectBox.exists).ok()
    .expect(fieldDescription('Automatically attach PDF to the selected notifications.').exists).ok()
})

test('should display Filename field', async t => {
  // Get selectors
  const fileNameInputField = Selector('#gfpdf_settings\\[filename\\]')
  const mergeTagBox = Selector('.open-list.tooltip-merge-tag[title^="<h6>Merge Tags</h6>Merge tags allow you to dynamic"]')
  const mergeTagOptionList = Selector('#gf_merge_tag_list').filterVisible()

  // Actions
  await run.navigateSettingsTab('gf_edit_forms')
  await t.click(mergeTagBox)

  // Assertions
  await t
    .expect(fieldLabel('Filename').exists).ok()
    .expect(fileNameInputField.exists).ok()
    .expect(fieldDescription('The name used when saving a PDF. Mergetags are allowed.').exists).ok()
    .expect(mergeTagBox.exists).ok()
    .expect(mergeTagOptionList.count).eql(1)
    .expect(listItem('User IP Address').exists).ok()
    .expect(listItem('Date (mm/dd/yyyy)').exists).ok()
})

test('should display Conditional Logic field', async t => {
  // Get selectors
  const conditionalLogicField = Selector('#gfpdf_conditional_logic_container').filterVisible()

  // Actions
  await run.navigateSettingsTab('gf_edit_forms')
  await t.click(run.conditionalCheckbox)

  // Assertions
  await t
    .expect(fieldLabel('Conditional Logic').exists).ok()
    .expect(run.conditionalCheckbox.exists).ok()
    .expect(fieldDescription('Enable conditional logic', 'label').exists).ok()
    .expect(conditionalLogicField.count).eql(1)
})

test('should toggle additional Conditional Logic field', async t => {
  // Get selectors
  const conditionalLogicField = Selector('#gfpdf_conditional_logic_container').filterHidden()

  // Actions
  await run.navigateSettingsTab('gf_edit_forms')
  await t
    .click(run.conditionalCheckbox)
    .click(run.conditionalCheckbox)

  // Assertions
  await t.expect(conditionalLogicField.exists).ok()
})