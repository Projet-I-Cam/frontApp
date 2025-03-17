# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:latest as build
LABEL Ismael Foletia alias XmaelXD <xmael@keepsec.ca>

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ./ /usr/local/app/

# Install all the dependencies
RUN npm install -f

# Generate the build of the application
#RUN npm install -g sass
#RUN sass  src/assets:src/assets --no-source-map

RUN npm cache clean --force

RUN npm run build 

# RUN node-sass BUILD/assets/layout/css/layout-blue.scss BUILD/assets/layout/css/layout-blue.css
# RUN node-sass BUILD/assets/theme/theme-blue.scss BUILD/assets/theme/theme-blue.css
RUN ls -a
# RUN ls

RUN ls -a dist
# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/app/dist/template/browser /usr/share/nginx/html

# Expose port 80
EXPOSE 80