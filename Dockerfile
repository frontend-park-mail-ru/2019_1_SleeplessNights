FROM node
#Копируем данные в контейнер
RUN mkdir /frontend
WORKDIR /frontend
COPY . /frontend/
#Запускаем сервер
RUN cd /frontend
RUN npm install
CMD npm start