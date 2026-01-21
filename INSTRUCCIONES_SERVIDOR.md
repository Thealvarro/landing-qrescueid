# Instrucciones para Ver la Landing Page en Local

## 🚀 Opción 1: Servidor PHP Incorporado (Recomendado)

### Instalación rápida de PHP:

1. **Descargar PHP para Windows:**
   - Ve a: https://windows.php.net/download/
   - Descarga la última versión "VS16 x64 Non Thread Safe" (ZIP)
   - Extrae el archivo ZIP a `C:\php`

2. **Configurar PATH:**
   - Presiona `Win + X` y selecciona "Sistema"
   - Haz clic en "Configuración avanzada del sistema"
   - Haz clic en "Variables de entorno"
   - En "Variables del sistema", busca "Path" y haz clic en "Editar"
   - Haz clic en "Nuevo" y agrega: `C:\php`
   - Acepta todos los diálogos

3. **Reiniciar PowerShell/CMD** y ejecutar:
   ```powershell
   cd C:\Users\Alvaro\Documents\GitHub\qrescueid-landing-cursor
   php -S localhost:8000
   ```

4. **Abrir en navegador:**
   - Ve a: http://localhost:8000

---

## 🚀 Opción 2: XAMPP (Incluye PHP + MySQL)

1. **Descargar XAMPP:**
   - https://www.apachefriends.org/download.html
   - Instala XAMPP (incluye PHP)

2. **Copiar archivos:**
   - Copia todos los archivos a: `C:\xampp\htdocs\qrescueid`

3. **Iniciar Apache:**
   - Abre el Panel de Control de XAMPP
   - Haz clic en "Start" junto a Apache

4. **Abrir en navegador:**
   - Ve a: http://localhost/qrescueid

---

## 🚀 Opción 3: Servidor Python (Solo visualización, sin PHP)

Ya está corriendo en segundo plano.

1. **Abrir en navegador:**
   - Ve a: http://localhost:8000

**⚠️ Nota:** Con Python, los archivos `.php` NO funcionarán. Solo verás la estructura HTML/CSS. El formulario de contacto no funcionará.

---

## ✅ Configurar Email en contact.php

Una vez que tengas PHP funcionando, edita `contact.php` línea 95:

```php
$to = 'tu-email@ejemplo.com'; // Cambia por tu email real
```

---

## 📝 Verificar que PHP funciona:

Abre PowerShell/CMD y ejecuta:
```powershell
php -v
```

Si muestra la versión de PHP, ¡está instalado correctamente!





