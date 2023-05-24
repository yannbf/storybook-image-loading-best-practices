const { toMatchImageSnapshot } = require('jest-image-snapshot')

const snapshotsDir = process.env.SNAPSHOTS_DIR || '__snapshots__'
const customSnapshotsDir = `${process.cwd()}/${snapshotsDir}`

const config = {
  setup() {
    expect.extend({ toMatchImageSnapshot })
  },
  async postRender(page, context) {
    // Visual snapshot tests
    const image = await page.screenshot({ fullPage: true })
    expect(image).toMatchImageSnapshot({
      customSnapshotsDir,
      customSnapshotIdentifier: context.id,
      failureThreshold: 0.03,
      failureThresholdType: 'percent',
    })
  },
}

module.exports = config
