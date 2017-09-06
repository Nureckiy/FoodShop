DELETE FROM DishPortions;
DELETE FROM Dishes;
DELETE FROM RoomCategories;
DELETE FROM Rooms;
GO

SET IDENTITY_INSERT Dishes ON;

INSERT INTO Dishes (Id, Category, Name, Description, ImageUrl)
VALUES 
(1, 4, N'СУШИ СЕТ 1', N'ролл с лососем, чука салатом и ореховым соусом, ролл с лососем, креветкой и икрой летучей рыбы, бонито маки, ролл с курицей терияки и икрой летучей рыбы', 'http://res.cloudinary.com/dum4mjc9q/image/upload/v1486978069/1482829184_91621151_zrcheo.jpg'),
(2, 4, N'СУШИ СЕТ 2', N'ролл с копченым угрем, авокадо и омлетом, ролл с форелью копченой и красной икрой, ролл с лососем, авокадо и кунжутом, чука маки с ореховым соусом', 'http://res.cloudinary.com/dum4mjc9q/image/upload/v1486979797/1482829975_29716529_otpens.jpg' ),
(3, 4, N'Сэт на 2х НИГИРИ И ГУНКАНЫ', N'эби 2, унаги 2, сяке 2, тамаго нигири 2, чука гункан 2, японский гарнир 2', 'http://res.cloudinary.com/dum4mjc9q/image/upload/v1486979935/1463578281_59972431_z7gn2k.jpg'),
(4, 4, N'Калифорния маки', N'креветка тигровая, авокадо, огурец, майонез, тобика оранжевая, рис, нори', 'http://res.cloudinary.com/dum4mjc9q/image/upload/v1486980023/1463527416_78862497_gjo3vn.jpg'),
(5, 4, N'Сяке унаги маки', N'лосось, угорь копченый, сыр сливочный, огурец, лук зеленый, рис, нори', 'http://res.cloudinary.com/dum4mjc9q/image/upload/v1486980046/1463527737_37945178_rc0wyx.jpg'),
(6, 4, N'Филадельфия агура маки', N'угорь копченый, сыр сливочный, омлет Тамаго, огурец, кунжут, соус Терияки, рис, нори', 'http://res.cloudinary.com/dum4mjc9q/image/upload/v1486980066/1463527901_87273676_e7a0bs.jpg'),
(7, 4, N'Японский гарнир', N'Соевый соус, имбирь розовый, васаби, лимон', 'http://res.cloudinary.com/dum4mjc9q/image/upload/v1486980866/1451981191_4500232_exj6l6.jpg'),
(8, 4, N'Васаби', N'Хрен Васаби, лимон', 'http://res.cloudinary.com/dum4mjc9q/image/upload/v1486980905/1447942920_48647628_prbqce.jpg'),
(9, 4, N'Соевый соус', N'Соевый соус', 'http://res.cloudinary.com/dum4mjc9q/image/upload/v1486980976/1437731751_80620068_ajmr0h.jpg'),
(10, 4, N'Имбирь', N'маринованный имбирь', 'http://res.cloudinary.com/dum4mjc9q/image/upload/v1486981007/1447942936_85626851_sm2lhm.jpg'),
(11, 4, N'Палочки для еды', N'Палочки', 'http://res.cloudinary.com/dum4mjc9q/image/upload/v1486983672/shutterstock_119657713-727x522_xrhwwm.jpg'); 

SET IDENTITY_INSERT Dishes OFF;

INSERT INTO DishPortions(Weight, Price, ParentId)
VALUES
(N'850 г', 27.90, 1),
(N'830 г', 34.50, 2),
(N'494 г', 21.90, 3),
(N'190 г', 10.90, 4),
(N'230 г', 12.90, 5),
(N'230 г', 8.60, 6),
(N'40/20/12 г', 2.90, 7),
(N'7/5 г', 0.90, 8),
(N'40 мл', 1, 9),
(N'20 г', 1, 10),
(N'2 шт', 0, 11);

SET IDENTITY_INSERT RoomCategories ON;

INSERT INTO RoomCategories(Id, GuestsNumber, Name, Description, CoverUrl)
VALUES
(1, 1, N'Одноместный', N'1-местный 1-комнатный номер. Ширина кровати - 120 см. Есть один номер, специально адаптированный для людей с ограниченными физическими возможностями.', 'http://res.cloudinary.com/dum4mjc9q/image/upload/v1489388908/room1_u15zyx.jpg'),
(2, 2, N'Двухместный', N'2-местный 1-комнатный номер с двумя раздельными кроватями (ширина 90 см).', 'http://res.cloudinary.com/dum4mjc9q/image/upload/v1489388908/room2_oubfch.jpg'),
(3, 3, N'Двухкомнатный', N'Элегантно декорированный, с оригинальным дизайном интерьера,просторный 2-местный 2-комнатный номер. Ширина кровати - 180 см.', 'http://res.cloudinary.com/dum4mjc9q/image/upload/v1489388908/room3_j0bhfv.jpg'),
(4, 3, N'Семейный', N'3-местный 2-комнатный номер. Ширина кровати - 180 см. Небольшая уютная гостиная и ванная комната с угловой ванной.', 'http://res.cloudinary.com/dum4mjc9q/image/upload/v1489388908/room4_utybt7.jpg'),
(5, 2, N'VIP', N'2-местный 2-комнатный номер повышенной комфортности. Ширина кровати - 180 см. Изысканный современный интерьер, великолепная гостиная с удобной мягкой мебелью и рабочей зоной, просторная ванная комната с угловой ванной.', 'http://res.cloudinary.com/dum4mjc9q/image/upload/v1489388909/room5_henff9.jpg'),
(6, 1, N'Гамак на балконе', N'Наш отель располагает чудесным видом из гамака. Будете ли Вы читать, загорать, спать или мечтать в гамаке, незабываемый вид несомненно позволит хорошенько расслабиться на отдыхе.', 'http://res.cloudinary.com/dum4mjc9q/image/upload/v1489388908/room6_o2owvy.jpg');

SET IDENTITY_INSERT RoomCategories OFF;

INSERT INTO Rooms(Price, Address, CategoryId, ImageUrl)
VALUES
(20, '421', 1, 'http://res.cloudinary.com/dum4mjc9q/image/upload/v1489651461/tropicana-rooms_zcsflc.jpg'),
(30, '113', 1, 'http://res.cloudinary.com/dum4mjc9q/image/upload/v1489388908/room1_u15zyx.jpg'),
(38, '90', 1, 'http://res.cloudinary.com/dum4mjc9q/image/upload/v1489651481/hotel-room_xyemto.jpg'),
(40, '114', 1, 'http://res.cloudinary.com/dum4mjc9q/image/upload/v1489651477/bradford_hotel_rooms_ffx76o.jpg'),
(60, '315', 3, 'http://res.cloudinary.com/dum4mjc9q/image/upload/v1489652245/deluxe1500x930_cn82tw.jpg'),
(65, '544', 3, 'http://res.cloudinary.com/dum4mjc9q/image/upload/v1489388908/room3_j0bhfv.jpg');