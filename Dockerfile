# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:18.20.4 as build
LABEL Ismael Foletia alias XmaelXD <xmael@keepsec.ca>

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ./ /usr/local/app/

# Install all the dependencies
# Utilise package-lock.json exactement
RUN npm i -f 
# RUN npm ci -f 
RUN npm list @angular/compiler @angular/compiler-cli typescript
# RUN npm install -f

# Generate the build of the application
#RUN npm install -g sass
#RUN sass  src/assets:src/assets --no-source-map

RUN npm cache clean --force

RUN ng build --verbose
RUN npm install -g serve
EXPOSE 80
# RUN ls

RUN ls -a dist
CMD ["serve", "-s", "dist/template/browser", "-l", "80"]
# # Stage 2: Serve app with nginx server

# # Use official nginx image as the base image
# FROM nginx:latest

# # Copy the build output to replace the default nginx contents.
# COPY --from=build /usr/local/app/dist/template/browser /usr/share/nginx/html

# # Expose port 80
# EXPOSE 80