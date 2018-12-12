const crypto = require("crypto");

const key = crypto.createHash("sha256").update("OMGCAT!", "ascii").digest();
let iv = "1234567890123456";
let responseObj = {
    data: "",    
    statusInfo: {
        code: "",
        message: ""
    },
    errorInfo: {
        code: "",
        message: ""
    }
};

module.exports = {
    encrypt: function(req) {        
        var ckey = crypto.createHash("sha256").update("OMGCAT!", "ascii").digest();
        var civ = "1234567890123456";                

        let cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
        let encrypted = cipher.update(JSON.stringify(req), 'utf8', 'hex');
        encrypted += cipher.final('hex');
        let tag = cipher.getAuthTag();
        
        return encrypted + "##" + tag.toString('hex');
        // return {
        //     content: encrypted,
        //     tag: tag
        //   }       
    },

    decrypt: function(source) {
        let data = source.toString().split("##");
        let encrypted = data[0];
        let tag = Buffer.from(data[1], 'hex');

        var dkey = crypto.createHash("sha256").update("OMGCAT!", "ascii").digest();
        var div = "1234567890123456";
        let decipher = crypto.createDecipheriv('aes-256-gcm', dkey, div);
        decipher.setAuthTag(tag);
        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');        
        return decrypted;
    },

    responseBuilder: function(res) {
        if(res) {
            responseObj.data = res;
            responseObj.statusInfo.code = "000";            
        } else{
            responseObj.errorInfo.code = "999";
            responseObj.errorInfo.message = "Unable to find related otp information.";
        }    

        return responseObj;
    }
}