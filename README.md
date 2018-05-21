# nodemailer-promisify

A promisified class for nodemailer lib:
https://nodemailer.com

## Installation
```bash
npm i git+https://github.com/AoiYamada/nodemailer-promisify --save
```

## Examples
```javascript
// Create Instance
const { Nodemailer } = require('nodemailer-promisify');

(async() => {
    // Test account
    account = await Nodemailer.CreateTestAccount();

    mailer = await new Nodemailer({
        host: 'smtp.ethereal.email', // 'smtp.gmail.com' for gmail
        port: 587,
        secure: false,
        auth: {
            user: account.user, // your acc
            pass: account.pass, // password
        }
    });

    // Send mail
    const mailOptions = {
        from: '"Fred Foo" <foo@example.com>',
        to: 'bar@example.com, baz@example.com',
        bcc: 'bar@example.com, baz@example.com',
        subject: 'Hello',
        text: 'Hello world?',
        html: '<b>Hello world?</b>'
    };

    const info = await mailer.Send(mailOptions);

    // Email preview, for test acc mode only
    console.log(Nodemailer.GetTestMessageUrl(info));
})();
```

## Test
```bash
npm test
```
