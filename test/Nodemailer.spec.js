const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();
const path = require('path');
const CWD = process.cwd();

const { Nodemailer } = require(path.join(CWD, 'Nodemailer'));

describe('Nodemailer', () => {
    let mailer;
    let account;

    before(async () => {
        account = await Nodemailer.CreateTestAccount();

        mailer = await new Nodemailer({
            host: 'smtp.ethereal.email',
            // host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: account.user,
                pass: account.pass,
                // user: 'xxx@xxx.xxx',
                // pass: '',
            }
        });
    });

    it('should send emails', async() => {
        const mailOptions = {
            from: '"Fred Foo" <foo@example.com>',
            to: 'bar@example.com, baz@example.com',
            bcc: 'bar@example.com, baz@example.com',
            subject: 'Hello',
            text: 'Hello world?',
            html: '<b>Hello world?</b>'
        };

        try {
            const info = await mailer.Send(mailOptions);
            expect(info).to.be.a('object');
            expect(info.messageId).to.be.a('string');
            // console.log(info);
            // console.log(Nodemailer.GetTestMessageUrl(info));
        } catch(err) {
            should.not.exist(err.message||err);
        }
    });
});