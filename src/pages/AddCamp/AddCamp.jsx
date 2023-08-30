import { Box, Button, Input, Paper, Switch, TextField } from '@mui/material'
import styles from './AddCamp.module.css'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/auth';
import React from 'react';
import axios from '../../axios'
import { AddBox } from '@mui/icons-material';

export default function AddCamp() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isAuth = useSelector(selectIsAuth);
    const [isLoading, setIsLoading] = React.useState(false);
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [socials, setSocials] = React.useState([]);

    const [isTgDisabled, setIsTgDisabled] = React.useState(true);
    const [isVkDisabled, setIsVkDisabled] = React.useState(true);
    const [isWaDisabled, setIsWaDisabled] = React.useState(true);
    const [isSmsDisabled, setIsSmsDisabled] = React.useState(true);

    const [tgText, setTgText] = React.useState('');
    const [vkText, setVkText] = React.useState('');
    const [waText, setWaText] = React.useState('');
    const [smsText, setSmsText] = React.useState('');

    const [tgButtons, setTgButtons] = React.useState([]);
    const [vkButtons, setVkButtons] = React.useState([]);
    const [waButtons, setWaButtons] = React.useState([]);

    const [tgInline, setTgInline] = React.useState(false);
    const [vkInline, setVkInline] = React.useState(false);
    const [waInline, setWaInline] = React.useState(false);

    const isEditing = Boolean(id);

    const onSubmit = async () => {
        try {
            setIsLoading(true);

            const fields = {
                title: title,
                description: description,
                socials: socials,
                buttons: {
                    tg: {
                        text: tgButtons.length ? tgButtons.split(',').join(' ').split(' ').filter(a => a !== "") : null,
                        inline: tgInline
                    },
                    vk: {
                        text: vkButtons.length ? vkButtons.split(',').join(' ').split(' ').filter(a => a !== "") : null,
                        inline: vkInline
                    },
                    wa: {
                        text: waButtons.length ? waButtons.split(',').join(' ').split(' ').filter(a => a !== "") : null,
                        inline: waInline
                    },
                },
                text: {
                    tg: tgText,
                    vk: vkText,
                    wa: waText,
                    sms: smsText
                }
            };

            const { data } = isEditing
                ? await axios.patch(`/campaigns/${id}`, fields)
                : await axios.post('/campaigns', fields);

            const _id = isEditing ? id : data._id;

            navigate(`/campaigns/${_id}`);
        } catch (error) {
            console.warn(error);
            alert("Ошибка при создании кампании!");
        }
    }

    React.useEffect(() => {
        if (id) {
            axios.get(`/campaigns/${id}`).then(({ data }) => {
                console.log(data)
                setTitle(data.campaignData.title);
                setDescription(data.campaignData.description);
                setSocials([...data.campaignData.socials]);

                setTgButtons(data.campaignData.buttons.tg.text.join(', '));
                setVkButtons(data.campaignData.buttons.vk.text.join(', '));
                setWaButtons(data.campaignData.buttons.wa.text.join(', '));

                setTgText(data.campaignData.text.tg);
                setVkText(data.campaignData.text.vk);
                setWaText(data.campaignData.text.wa);
                setSmsText(data.campaignData.text.sms);

                setIsTgDisabled(!socials.includes('telegram'));
                setIsVkDisabled(!socials.includes('vk'));
                setIsSmsDisabled(!socials.includes('sms'));
                setIsWaDisabled(!socials.includes('whatsapp'));

                setTgInline(data.campaignData.buttons.tg.inline);
                setVkInline(data.campaignData.buttons.vk.inline);
                setWaInline(data.campaignData.buttons.wa.inline);
            }).catch((err) => console.warn(err));
        }
    }, [])

    if (!window.localStorage.getItem('token') && !isAuth) {
        return <Navigate to="/login" />
    }

    function handleChange(e) {
        if (e.target.checked) {
            socials.push(e.target.value)
        } else {
            socials.splice(socials.indexOf(e.target.value), 1)
        }

        setIsTgDisabled(!socials.includes('telegram'));
        setIsVkDisabled(!socials.includes('vk'));
        setIsSmsDisabled(!socials.includes('sms'));
        setIsWaDisabled(!socials.includes('whatsapp'));
    }

    return (
        <>
            <h1 className={styles.title}>Создание новой кампании</h1>
            <Box>
                <Paper className={styles.form} style={{ padding: 30 }}>
                    <br />
                    <Input
                        className={styles.input_title}
                        variant="standard"
                        placeholder="Название кампании..."
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        fullWidth
                    />
                    <Input
                        className={styles.input}
                        variant="standard"
                        placeholder="Описание вашей кампании"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        fullWidth
                    />
                    <div className={styles.socials}>
                        <p className={styles.socials_title}>Выберите каналы для кампании</p>
                        <Box className={styles.socials}>
                            <div className={styles.social}>
                                <div className={styles.row}>
                                    <p>Telegram</p>
                                    <img src='/img/telegram.svg' alt='telegram' />
                                    <input checked={socials.includes('telegram')} onChange={handleChange} value='telegram' type="checkbox" />
                                </div>
                                <div className={styles.lower}>
                                    <TextField
                                        multiline
                                        placeholder='Введите текст для Telegram'
                                        fullWidth
                                        value={tgText}
                                        onChange={e => setTgText(e.target.value)}
                                        disabled={isTgDisabled}
                                        rows={6}
                                    />
                                    <div className={styles.social__buttons}>
                                        <div className={styles.column}>
                                            <p>Перечислите текста кнопок через запятую</p>
                                            <Input
                                                value={tgButtons}
                                                disabled={isTgDisabled}
                                                className={styles.social__input}
                                                onChange={e => setTgButtons(e.target.value)}
                                            />
                                        </div>
                                        <div className={styles.column}>
                                            <p>Включить inline-отображение?</p>
                                            <Switch checked={tgInline} disabled={isTgDisabled} onChange={e => setTgInline(e.target.checked)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.social}>
                                <div className={styles.row}>
                                    <p>Vk</p>
                                    <img src='/img/vk.svg' alt='telegram' />
                                    <input checked={socials.includes('vk')} onChange={handleChange} value='vk' type="checkbox" />
                                </div>
                                <div className={styles.lower}>
                                    <TextField
                                        multiline
                                        placeholder='Введите текст для Vk'
                                        fullWidth
                                        value={vkText}
                                        onChange={e => setVkText(e.target.value)}
                                        disabled={isVkDisabled}
                                        rows={6}
                                    />
                                    <div className={styles.social__buttons}>
                                        <div className={styles.column}>
                                            <p>Перечислите текста кнопок через запятую</p>
                                            <Input
                                                disabled={isVkDisabled}
                                                value={vkButtons}
                                                className={styles.social__input}
                                                onChange={e => setVkButtons(e.target.value)}
                                            />
                                        </div>
                                        <div className={styles.column}>
                                            <p>Включить inline-отображение?</p>
                                            <Switch checked={vkInline} disabled={isVkDisabled} onChange={e => setVkInline(e.target.checked)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.social}>
                                <div className={styles.row}>
                                    <p>Whatsapp</p>
                                    <img src='/img/whatsapp.svg' alt='whatsapp' />
                                    <input checked={socials.includes('whatsapp')} onChange={handleChange} value='whatsapp' type="checkbox" />
                                </div>
                                <div className={styles.lower}>
                                    <TextField
                                        multiline
                                        placeholder='Введите текст для Whatsapp'
                                        fullWidth
                                        value={waText}
                                        onChange={e => setWaText(e.target.value)}
                                        disabled={isWaDisabled}
                                        rows={6}
                                    />
                                    <div className={styles.social__buttons}>
                                        <div className={styles.column}>
                                            <p>Перечислите текста кнопок через запятую</p>
                                            <Input
                                                disabled={isWaDisabled}
                                                value={waButtons}
                                                className={styles.social__input}
                                                onChange={e => setWaButtons(e.target.value)}
                                            />
                                        </div>
                                        <div className={styles.column}>
                                            <p>Включить inline-отображение?</p>
                                            <Switch checked={waInline} disabled={isWaDisabled} onChange={e => setWaInline(e.target.checked)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.social}>
                                <div className={styles.row}>
                                    <p>SMS</p>
                                    <img src='/img/sms.svg' alt='sms' />
                                    <input checked={socials.includes('sms')} onChange={handleChange} value='sms' type="checkbox" />
                                </div>
                                <div className={styles.lower}>
                                    <TextField
                                        multiline
                                        placeholder='Введите текст для SMS'
                                        fullWidth
                                        value={smsText}
                                        onChange={e => setSmsText(e.target.value)}
                                        disabled={isSmsDisabled}
                                        rows={6}
                                    />
                                </div>
                            </div>
                        </Box>
                    </div>

                    <div className={styles.buttons}>
                        <Button onClick={onSubmit} size="large" variant="contained">
                            Сохранить
                        </Button>
                        <Button size="large">Отмена</Button>
                    </div>
                </Paper>
            </Box>
        </>
    )
}