const nodemailer = require('nodemailer');

/**
 * Nodemailer abstract class
 * https://nodemailer.com
 * @property {Transporter} _Transporter - an object that is able to send mail
 *
 */
class Nodemailer {
    /**
     * Create transporter
     * @param {Object} options - nodemailer options
     * @example
     * {
     *      host: 'smtp.gmail.com',
     *      port: 587,
     *      secure: false,
     *      auth: {
     *          user: 'xxxx@xxx.xx',
     *          pass: 'xxxxxxxxxx',
     *      }
     * }
     */
    constructor(options) {
        this._Transporter = nodemailer.createTransport(options);
    }

    /**
     * Send mail
     * @param {Object} mailOptions - nodemailer mailOptions
     * @example
     * {
     *      from: '"Fred Foo" <foo@example.com>', // sender address
     *      to: 'bar@example.com, baz@example.com', // list of receivers
     *      bcc: 'bar@example.com, baz@example.com',
     *      subject: 'Hello', // Subject line
     *      text: 'Hello world?', // plain text body
     *      html: '<b>Hello world?</b>' // html body
     * }
     *
     * @return {Promise<Object|Error>} resolve info object of nodemailer if success
     * @throw {Error} if the transporter is not verified
     *
     */
    async Send(mailOptions) {
        const _this = this;
        const verified = await this._Verify();
        return new Promise((resolve, reject) => {
            _this._Transporter.sendMail(mailOptions, (err, info) => {
                if (err)
                    reject(err);
                else {
                    resolve(info);
                }
            });
        });
    }

    /**
     * Verify connection configuration
     * @return {Promise<True|Error>} resolve Null if the server is ready to accept messages
     *
     */
    _Verify() {
        const _this = this;
        return new Promise((resolve, reject) => {
            _this._Transporter.verify((err, success) => {
                if (err)
                    reject(err);
                else
                    resolve(null);
            });
        });
    }

    /**
     * Create a ethereal acc for testing
     * @return {Promise<Object|Error>} account - resolve ethereal acc
     * @return {String} account.user
     * @return {String} account.pass - password
     *
     */
    static CreateTestAccount() {
        return new Promise((resolve, reject) => {
            nodemailer.createTestAccount((err, account) => {
                if(err)
                    reject(err);
                else
                    resolve(account);
            });
        });
    }

    /**
     * Get test email preview url(for CreateTestAccount only)
     * @param {Object} info - info returned by Send method
     * @return {String} url
     *
     */
    static GetTestMessageUrl(info) {
        return nodemailer.getTestMessageUrl(info);
    }
}

module.exports = {
    Nodemailer,
}