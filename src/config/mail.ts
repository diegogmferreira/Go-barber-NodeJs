interface IMailConfig {
    driver: 'ethereal' | 'ses';
    
    defaults: {
        from: {
            email: string;
            name: string;
        }
    } 
}

export default {
    driver: process.env.MAIL_DRIVER || 'ethereal',

    defaults: {
        from: {
            email: 'diego.galvao@galdev.com.br',
            name: 'Diego Galvão'
        }
    }
} as IMailConfig;