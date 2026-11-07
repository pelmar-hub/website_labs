import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { clearCart } from '../redux/actions';
import FormError from '../components/FormError';
import PrimaryButton from '../components/PrimaryButton';
import { ShieldCheck, User, Phone, Mail, CreditCard, Calendar, CheckSquare } from 'lucide-react';

// Схема валидации Yup (Вимоги Лаб 11)
const checkoutSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, "ПІБ має містити щонайменше 3 символи")
    .max(50, "ПІБ занадто довге")
    .matches(/^[а-яА-ЯіІїЇєЄa-zA-Z\s]+$/, "Дозволені лише літери та пробіли")
    .required("Введіть ваше повне ім'я"),

  phone: Yup.string()
    .matches(/^\+380\d{9}$/, "Формат має бути: +380XXXXXXXXX (12 цифр)")
    .required("Номер телефону обов'язковий"),

  email: Yup.string()
    .email("Некоректний формат електронної пошти")
    .required("Введіть e-mail для отримання квитанції"),

  cardNumber: Yup.string()
    .matches(/^\d{16}$/, "Номер картки повинен містити рівно 16 цифр")
    .required("Введіть номер картки для холдування застави"),

  rentalStartDate: Yup.date()
    .min(new Date(Date.now() - 86400000), "Дата не може бути в минулому")
    .required("Оберіть дату початку оренди"),

  agreeTerms: Yup.boolean()
    .oneOf([true], "Необхідно погодитися з правилами холдування застави")
});

export default function CheckoutPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalRent = cartItems.reduce((acc, i) => acc + i.dayPrice * i.days, 0);
  const totalDeposit = cartItems.reduce((acc, i) => acc + i.depositPrice, 0);

  const handleSubmit = (values, { setSubmitting }) => {
    // Формируем данные заказа с ячейками постамата
    const orderData = {
      orderId: "MB-" + Math.floor(100000 + Math.random() * 900000),
      client: values,
      items: cartItems,
      totalRent,
      totalDeposit,
      pinCodes: cartItems.map(item => ({
        boxId: item.boxId,
        pin: Math.floor(1000 + Math.random() * 9000).toString(),
        toolTitle: item.title
      }))
    };

    // Очищаем Redux корзину (Лаб 10)
    dispatch(clearCart());
    setSubmitting(false);

    // Перенаправляем на страницу успеха (Вимога Лаб 11)
    navigate('/success', { state: { order: orderData } });
  };

  if (cartItems.length === 0) {
    navigate('/catalog');
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-3xl text-center space-y-2">
        <h2 className="text-2xl font-extrabold text-white">Оформлення оренди</h2>
        <p className="text-xs text-slate-400">
          Заповніть форму для авторизації платежу та генерації PIN-кодів доступу до комірок ESP32
        </p>
      </div>

      <div className="bg-slate-800/60 border border-slate-700/60 p-6 sm:p-8 rounded-3xl shadow-xl">
        <Formik
          initialValues={{
            fullName: '',
            phone: '+380',
            email: '',
            cardNumber: '',
            rentalStartDate: new Date().toISOString().split('T')[0],
            agreeTerms: false
          }}
          validationSchema={checkoutSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* Поле 1: ПІБ */}
              <div>
                <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1">
                  1. Прізвище та ім'я *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  <Field
                    type="text"
                    name="fullName"
                    placeholder="Тарас Шевченко"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-500 transition"
                  />
                </div>
                <ErrorMessage name="fullName" component={FormError} />
              </div>

              {/* Поле 2: Телефон (Regex) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1">
                    2. Телефон (SMS з кодом) *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                    <Field
                      type="text"
                      name="phone"
                      placeholder="+380671234567"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-500 font-mono transition"
                    />
                  </div>
                  <ErrorMessage name="phone" component={FormError} />
                </div>

                {/* Поле 3: E-mail */}
                <div>
                  <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1">
                    3. Електронна пошта *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                    <Field
                      type="email"
                      name="email"
                      placeholder="client@mail.com"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-500 transition"
                    />
                  </div>
                  <ErrorMessage name="email" component={FormError} />
                </div>
              </div>

              {/* Поле 4: Номер картки */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1">
                    4. Номер банківської картки *
                  </label>
                  <div className="relative">
                    <CreditCard className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                    <Field
                      type="text"
                      name="cardNumber"
                      maxLength="16"
                      placeholder="4111 2222 3333 4444"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-500 font-mono transition"
                    />
                  </div>
                  <ErrorMessage name="cardNumber" component={FormError} />
                </div>

                {/* Поле 5: Дата оренди */}
                <div>
                  <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1">
                    5. Дата отримання в постаматі *
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                    <Field
                      type="date"
                      name="rentalStartDate"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white outline-none focus:border-amber-500 transition"
                    />
                  </div>
                  <ErrorMessage name="rentalStartDate" component={FormError} />
                </div>
              </div>

              {/* Чекбокс согласия */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <Field
                    type="checkbox"
                    name="agreeTerms"
                    className="mt-1 w-4 h-4 rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-0 cursor-pointer"
                  />
                  <span className="text-xs text-slate-400">
                    Я підтверджую холдування суми застави ({totalDeposit} грн) на моєму рахунку та зобов'язуюсь повернути обладнання у чистому стані з фотофіксацією.
                  </span>
                </label>
                <ErrorMessage name="agreeTerms" component={FormError} />
              </div>

              {/* Финансовый итог */}
              <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Оренда до сплати:</span>
                  <span className="font-mono text-white font-bold">{totalRent} грн</span>
                </div>
                <div className="flex justify-between text-amber-400">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Застава до блокування:
                  </span>
                  <span className="font-mono font-bold">{totalDeposit} грн</span>
                </div>
              </div>

              <PrimaryButton
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 mt-4 text-center"
              >
                {isSubmitting ? "Формування ключів..." : `Підтвердити та отримати PIN-коди (${totalRent + totalDeposit} грн)`}
              </PrimaryButton>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}