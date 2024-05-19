
const { Translate } = require('@google-cloud/translate').v2

const CREDENTIALS = JSON.parse(process.env.GCP_CREDENTIALS || '{}')

const translate = new Translate({
    projectID: CREDENTIALS.project_id,
    credentials: CREDENTIALS
});

export default translate