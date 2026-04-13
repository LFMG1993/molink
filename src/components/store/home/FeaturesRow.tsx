import {Download, CheckCircleFill, CreditCard, Headset} from 'react-bootstrap-icons';
import {useTranslation} from 'react-i18next';

export function FeaturesRow() {
    const {t} = useTranslation();

    return (
        <section className="container mx-auto px-4 py-12 border-b border-slate-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="flex gap-4 items-start">
                    <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                        <Download className="w-6 h-6"/>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800 text-sm">{t('store.features.delivery_title')}</h4>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">{t('store.features.delivery_desc')}</p>
                    </div>
                </div>
                <div className="flex gap-4 items-start">
                    <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
                        <CheckCircleFill className="w-6 h-6"/>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800 text-sm">{t('store.features.original_title')}</h4>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">{t('store.features.original_desc')}</p>
                    </div>
                </div>
                <div className="flex gap-4 items-start">
                    <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600">
                        <CreditCard className="w-6 h-6"/>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800 text-sm">{t('store.features.secure_title')}</h4>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">{t('store.features.secure_desc')}</p>
                    </div>
                </div>
                <div className="flex gap-4 items-start">
                    <div className="p-3 bg-purple-50 rounded-lg text-purple-600">
                        <Headset className="w-6 h-6"/>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800 text-sm">{t('store.features.support_title')}</h4>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">{t('store.features.support_desc')}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
