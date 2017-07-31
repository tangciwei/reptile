const {ECS, DYSMS} = require('waliyun');

let options = {
    AccessKeyId: 'xxxx-xxxx-xxxx-xxxx',
    AccessKeySecret: 'xxxx-xxxx-xxxx-xxxx',
    // 选填，不同接口类型注意版本日期，2.0.0之后版本会带上默认版本，但可能会落后于最新，需要注意 
    Version: '2014-05-26',
    // 选填 
    SignatureMethod: 'HMAC-SHA1',
    Format: 'json',
    SignatureVersion: '1.0',
    // 不填，每次请求都会自动重新生成 
    SignatureNonce: Math.random(),
    Timestamp: new Date().toISOString()
};

const ecs = ECS(options);
// // Within Async Func 
// (async() => {
//   const instances = await ecs.describeInstances({
//     RegionId: 'cn-hangzhou'
//   });
//   // xxxx 
// });

const sms = DYSMS({
    AccessKeyId: 'xxxx',
    AccessKeySecret: 'xxxx'
});

sms.sendSms({
    TemplateParam: JSON.stringify({
        customer: '1234'
    }),
    PhoneNumbers: mobileNo,
    SignName: '您的签名',
    TemplateCode: 'SMS_77778888'
});
