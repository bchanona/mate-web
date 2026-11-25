// Contenido del curso. Para un video directo, agrega una URL como 3er elemento de un video; si no, abre una búsqueda en YouTube.
const TEMAS = [
{id:1,titulo:"Números reales, negativos y racionales",intro:"Los negativos miden lo que está por debajo de un punto de referencia: el cero.",
secciones:[
{t:"1.1 La recta numérica",c:`<p>El 0 está al centro; los positivos a la derecha y los negativos a la izquierda. Mientras más a la derecha, mayor: <b>−1 &gt; −4</b>.</p><p>Opuestos: 3 y −3. Valor absoluto: |−5| = 5 (nunca es negativo). El cero no es positivo ni negativo.</p><p><b>Ejemplo:</b> en Toluca amaneció a −3 °C y llegó a 12 °C: 12 − (−3) = 15 °C. Un buzo a −18 m sube 7 m: −18 + 7 = −11 m.</p>`,w:"recta"},
{t:"1.2 Racionales e irracionales",c:`<p><b>Racionales:</b> se escriben como a/b (b ≠ 0): enteros, decimales exactos (0.75) y periódicos (0.333…).</p><p><b>Irracionales:</b> decimales infinitos sin patrón: π, √2.</p><p>Truco: raíz exacta → racional (√16 = 4); raíz no exacta → irracional (√15).</p>`},
{t:"1.3 Comparar y ordenar",c:`<p>Tres métodos: recta numérica, pasar a decimal (3/4 = 0.75 &gt; 5/8 = 0.625) o común denominador (2/3 = 8/12 &lt; 9/12 = 3/4).</p><p>Entre dos negativos es mayor el más cercano al cero: −1/2 &gt; −3/4.</p><p><b>Ejemplo:</b> 0.4, −1/2, 3/5, −0.8, 0 → −0.8 &lt; −1/2 &lt; 0 &lt; 0.4 &lt; 3/5.</p>`,w:"comparar"},
{t:"1.4 Ley de los signos",c:`<p><b>Signos iguales dan +; signos diferentes dan −.</b> Igual en la división.</p><p>Patrón: 2×(−3) = −6, 1×(−3) = −3, 0×(−3) = 0, (−1)×(−3) = 3. Perdonar 3 deudas de $50: (−3)(−50) = +150.</p><p>Varios factores: cantidad par de negativos → positivo; impar → negativo. (−2)(−3)(−1) = −6.</p><p><b>Aplicación:</b> un congelador a 4 °C baja 3 °C por hora. En 5 h: 4 + 5(−3) = −11 °C. Para llegar a −14 °C: (−18) ÷ (−3) = 6 h.</p>`,w:"signos"}],
ejercicios:[
["Ordena de menor a mayor: −2, 1/3, −0.25, −5/4, 0.3","−2 < −5/4 < −0.25 < 0.3 < 1/3"],
["Clasifica: √36, 0.121212…, √7, −8/3, π/2","Racionales: √36 = 6, 0.1212… = 4/33, −8/3. Irracionales: √7, π/2"],
["Calcula: (−6)(4), (−7)(−8), (−1)(−2)(−3)(−4), (−3/4)(8/9)","−24; 56; 24; −2/3"],
["Un elevador está en el sótano −3, sube 9 pisos y baja 4. ¿Dónde queda?","−3 + 9 − 4 = piso 2"],
["Ana debe $120 y paga $35 por semana durante 3 semanas. ¿Cuánto debe?","−120 + 3(35) = −15: todavía debe $15"]],
videos:[["SEP: Los negativos","SEP Los negativos recta numérica"],["SEP: Regla de los signos de la multiplicación de enteros","SEP regla de los signos multiplicación números enteros"],["Números negativos en la recta (Julioprofe)","Julioprofe números negativos recta numérica"],["Racionales e irracionales (profe Alex)","Matemáticas profe Alex números racionales e irracionales"],["Ordenar fracciones negativas (Daniel Carreón)","Daniel Carreón comparar y ordenar fracciones negativas"],["Ley de los signos (Khan Academy Español)","Khan Academy Español ley de los signos multiplicación"]]},

{id:2,titulo:"Propiedades de las operaciones",intro:"Atajos legales para reacomodar una operación sin cambiar el resultado.",
secciones:[
{t:"2.1 Conmutativa",c:`<p>El orden no importa en la suma ni en la multiplicación: 7 + 15 = 15 + 7; 4 × 25 = 25 × 4.</p><p><b>Cuidado:</b> la resta y la división no son conmutativas (9 − 4 = 5, pero 4 − 9 = −5).</p><p><b>Ejemplo:</b> 18 + 37 + 2 + 3 = (18 + 2) + (37 + 3) = 20 + 40 = 60.</p>`},
{t:"2.2 Asociativa",c:`<p>Puedes cambiar la agrupación: (2 × 5) × 7 = 2 × (5 × 7) = 70.</p><p><b>Ejemplo:</b> 25 × 17 × 4 = (25 × 4) × 17 = 100 × 17 = 1 700. Y −3(4y) = (−3 × 4)y = −12y.</p>`},
{t:"2.3 Distributiva",c:`<p><b>a(b + c) = ab + ac.</b> Es el área de un rectángulo de alto a partido en dos anchos, b y c.</p><p><b>Desarrollar:</b> 4(x + 5) = 4x + 20; −2(5y − 6) = −10y + 12 (el −2 cambia todos los signos).</p><p><b>Factorizar</b> (camino inverso): 12x + 18 = 6(2x + 3). Comprueba desarrollando.</p><p><b>Cálculo mental:</b> 7 × 98 = 7 × 100 − 7 × 2 = 686.</p>`,w:"area"},
{t:"2.4 Aplicación: la fiesta escolar",c:`<p>32 alumnos necesitan refresco ($15), torta ($35) y dulces ($10). En vez de tres multiplicaciones: 32 × (15 + 35 + 10) = 32 × 60 = <b>$1 920</b>.</p><p>Si llegan 5 más: 5 × 60 = $300 más, total $2 220.</p>`}],
ejercicios:[
["¿Qué propiedad? a) 6×9 = 9×6; b) (3×4)×5 = 3×(4×5); c) 2(x+7) = 2x+14","a) conmutativa; b) asociativa; c) distributiva"],
["Calcula mentalmente: 50 × 13 × 2; 46 + 27 + 54 + 3","1 300; 130"],
["Desarrolla: 5(2x+3); −4(a−6); 3(2x+y−5)","10x + 15; −4a + 24; 6x + 3y − 15"],
["Factoriza: 9x+27; 20m−15n; 14a+21b+7","9(x+3); 5(4m−3n); 7(2a+3b+1)"],
["Boleto $85 y palomitas $45 para 4 personas","4(85 + 45) = 4 × 130 = $520"]],
videos:[["Conmutativa y asociativa (profe Alex)","Matemáticas profe Alex propiedad conmutativa y asociativa"],["Distributiva con áreas (Khan Academy Español)","Khan Academy Español propiedad distributiva áreas"],["Factor común (Julioprofe)","Julioprofe factorizar factor común"],["Distributiva, ejercicios (Daniel Carreón)","Daniel Carreón propiedad distributiva ejercicios"]]},

{id:3,titulo:"Teoría de números y fracciones",intro:"El MCM responde «¿cuándo coinciden?»; el MCD, «¿en cuántos grupos iguales, lo más grandes posible?».",
secciones:[
{t:"3.1 Múltiplos, divisores y primos",c:`<p>Múltiplos de 4: 4, 8, 12… (infinitos). Divisores de 18: 1, 2, 3, 6, 9, 18 (finitos). Un primo solo tiene dos divisores: 1 y él mismo.</p><p><b>Divisibilidad:</b> entre 2 si termina en par; entre 3 si la suma de dígitos es múltiplo de 3; entre 5 si termina en 0 o 5; entre 9 si la suma es múltiplo de 9; entre 10 si termina en 0.</p>`},
{t:"3.2 Calcular MCM y MCD",c:`<p>Descompón en primos: 24 = 2³ × 3 y 36 = 2² × 3².</p><p><b>MCD:</b> comunes con el menor exponente → 2² × 3 = 12.<br><b>MCM:</b> todos con el mayor exponente → 2³ × 3² = 72.</p><p>Comprobación: MCD × MCM = producto → 12 × 72 = 24 × 36.</p>`,w:"mcm"},
{t:"3.3 Problemas verbales",c:`<p><b>MCM</b> si dice «volver a coincidir», «al mismo tiempo». <b>MCD</b> si dice «partes iguales lo más grandes posible», «sin que sobre».</p><p>Taquería cada 4, 6 y 8 días: MCM = 24 días. 18, 24 y 36 tacos en platos iguales: MCD = 6 platos (3, 4 y 6 de cada tipo).</p>`},
{t:"3.4 Suma y resta de fracciones",c:`<p>Mismo denominador: opera numeradores. <b>Error típico:</b> 3/4 + 3/4 ≠ 6/8; es 6/4 = 3/2.</p><p>Distinto denominador: 1) MCM de denominadores, 2) fracciones equivalentes, 3) opera numeradores, 4) simplifica.</p><p>5/6 + 3/4 = 10/12 + 9/12 = 19/12 = 1 7/12. −3/4 + 1/6 = −9/12 + 2/12 = −7/12.</p>`,w:"fracciones"}],
ejercicios:[
["Descompón en primos: 60, 84, 126","2²×3×5; 2²×3×7; 2×3²×7"],
["MCM y MCD de (12, 18) y de (20, 30, 45)","(12,18): MCM 36, MCD 6. (20,30,45): MCM 180, MCD 5"],
["Dos autobuses salen a las 6:00, uno cada 15 min y otro cada 20. ¿Cuándo salen juntos?","MCM = 60 min → a las 7:00"],
["Tablas de 120 cm y 84 cm en piezas iguales, lo más largas posible","MCD = 12 → piezas de 12 cm; salen 10 + 7 = 17"],
["Resuelve: 3/5+1/4; 7/8−5/6; 2 1/3+1 3/4; −2/3+5/9","17/20; 1/24; 49/12 = 4 1/12; −1/9"],
["Luis leyó 1/4 y luego 2/5 de un libro. ¿Qué fracción falta?","Leyó 13/20; le falta 7/20"]],
videos:[["Divisores (SEP Aprende en Casa)","SEP Aprende en Casa Una respuesta inesperada divisores"],["MCM y MCD por primos (Julioprofe)","Julioprofe MCM y MCD descomposición en factores primos"],["Problemas de MCM y MCD (profe Alex)","Matemáticas profe Alex problemas MCM MCD"],["Fracciones distinto denominador (Daniel Carreón)","Daniel Carreón suma y resta de fracciones distinto denominador"],["Problemas de fracciones (Khan Academy Español)","Khan Academy Español problemas de fracciones"]]},

{id:4,titulo:"Proporcionalidad y porcentajes",intro:"Una razón compara dos cantidades; un porcentaje compara contra 100.",
secciones:[
{t:"4.1 Razones y tasas",c:`<p>Se escriben «3 a 4», 3 : 4 o 3/4. En un salón con 12 mujeres y 18 hombres: mujeres:hombres = 12 : 18 = 2 : 3. El orden importa.</p><p>Tasa: razón entre unidades distintas (120 km en 2 h = 60 km/h). Tasa unitaria: «$18 por litro».</p>`},
{t:"4.2 Proporciones y regla de tres",c:`<p>Proporción: a/b = c/d → <b>a × d = b × c</b>.</p><p>3 cuadernos cuestan $54; ¿8? 3x = 54 × 8 → x = $144 (o 54 ÷ 3 = $18 por cuaderno).</p><p>Escala 1 : 50 000: 7 cm en el mapa = 3.5 km reales. ¿Qué conviene? 600 mL a $18 = $30/L; 2 L a $42 = $21/L → el de 2 L.</p>`},
{t:"4.3 Porcentajes",c:`<p>35% = 35/100 = 0.35 = 7/20. Referencias: 50% = 1/2, 25% = 1/4, 10% = mueve el punto un lugar, 5% = mitad del 10%.</p><p>Barra: si 40% = 280 g → 10% = 70 g → 100% = 700 g.</p>`,w:"porcentaje"},
{t:"4.4 Conversiones y problemas",c:`<p>Fracción → decimal: divide. Decimal → %: ×100. % → decimal: ÷100. <b>0.5% = 0.005</b>, no 0.5.</p><p>Parte: 15% de 840 = 0.15 × 840 = 126. Porcentaje: 18 de 24 = 75%. Total: 45 es 30% de 45 ÷ 0.30 = 150.</p><p>Descuento 20% → × 0.80. IVA 16% → × 1.16. Tenis $1 450 con 30% de descuento e IVA: 1 450 × 0.70 × 1.16 = $1 177.40.</p>`}],
ejercicios:[
["15 canicas rojas y 25 azules: razón rojas:azules y azules:total","3 : 5 y 5 : 8"],
["4 personas usan 300 g de arroz. ¿Y 10 personas?","75 g por persona → 750 g"],
["A decimal y %: 3/5, 7/8, 1/3. A fracción: 45%, 2.5%, 120%","0.6 = 60%; 0.875 = 87.5%; 0.333… ≈ 33.3%. 9/20; 1/40; 6/5"],
["35% de 260; ¿qué % es 27 de 90?; 63 es el 70% de…","91; 30%; 90"],
["Celular de $6 500 sube 12% y luego baja 12%. ¿Regresa a $6 500?","7 280 × 0.88 = $6 406.40. No: el descuento se calcula sobre un precio mayor (1.12 × 0.88 = 0.9856)"]],
videos:[["Introducción a las razones (Khan Academy Español)","Khan Academy Español introducción a las razones"],["Regla de tres simple (profe Alex)","Matemáticas profe Alex regla de tres simple directa"],["Porcentajes: cuadrícula y barra (Khan Academy Español)","Khan Academy Español porcentajes cuadrícula barra"],["Fracción, decimal y % (Daniel Carreón)","Daniel Carreón convertir fracción decimal porcentaje"],["Descuentos e IVA (Julioprofe)","Julioprofe problemas porcentajes descuentos IVA"]]},

{id:5,titulo:"Leyes de los exponentes",intro:"Una potencia es una multiplicación repetida: 2⁵ = 2·2·2·2·2 = 32.",
secciones:[
{t:"5.1 Producto y cociente",c:`<p><b>Misma base, se suman exponentes:</b> aᵐ · aⁿ = aᵐ⁺ⁿ → 2³ · 2⁴ = 2⁷.</p><p><b>Se restan:</b> aᵐ ÷ aⁿ = aᵐ⁻ⁿ → 5⁶ ÷ 5⁴ = 5².</p><p>De aquí: a⁰ = 1 y a⁻ⁿ = 1/aⁿ (2⁻³ = 1/8).</p><p><b>Errores típicos:</b> 2³ · 2⁴ ≠ 4⁷ (la base se conserva) y 2³ + 2⁴ ≠ 2⁷ (no aplica a sumas).</p>`,w:"exponentes"},
{t:"5.2 Potencia de potencia, producto y cociente",c:`<p>(aᵐ)ⁿ = aᵐ·ⁿ → (x⁴)⁵ = x²⁰.<br>(ab)ⁿ = aⁿbⁿ → (2x)³ = 8x³.<br>(a/b)ⁿ = aⁿ/bⁿ → (2/5)³ = 8/125.</p><p><b>Signos:</b> (−2)⁴ = 16, (−2)³ = −8, −2⁴ = −16. Y (a + b)² ≠ a² + b².</p><p>(2x³y)² · x⁴ ÷ 4x⁵ = 4x⁶y² · x⁴ ÷ 4x⁵ = x⁵y².</p>`},
{t:"5.3 Exponentes fraccionarios",c:`<p><b>a^(m/n) = (ⁿ√a)ᵐ:</b> el denominador es el índice de la raíz y el numerador, la potencia.</p><p>9^(1/2) = 3; 27^(1/3) = 3; 8^(2/3) = (∛8)² = 4; 9^(−1/2) = 1/3. Saca primero la raíz y luego eleva.</p><p>x^(1/2) · x^(1/3) = x^(5/6).</p>`},
{t:"5.4 Aplicaciones",c:`<p>Bacterias que se duplican cada hora: 2⁵ · 2¹⁰ = 2¹⁵ = 32 768. Memoria de 2³⁶ bytes con fotos de 2²²: 2¹⁴ = 16 384 fotos.</p><p>Cubo de 343 cm³: lado = 343^(1/3) = 7 cm. Si duplicas el lado, el volumen se multiplica por 2³ = 8.</p>`}],
ejercicios:[
["Simplifica: a⁴·a⁷; 3⁸÷3⁵; (m³)⁴; (5x²)³; (2/7)²","a¹¹; 27; m¹²; 125x⁶; 4/49"],
["Calcula: 4⁰; 5⁻²; (−3)⁴; −3⁴; 10⁶÷10⁹","1; 1/25; 81; −81; 0.001"],
["Simplifica: (3x²y³)² · 2x ÷ (6x⁴y⁵)","3xy"],
["Calcula: 49^(1/2); 125^(1/3); 16^(3/4); 27^(2/3); 100^(−1/2)","7; 5; 8; 9; 1/10"],
["Como exponente: √x·⁴√x; ∛(x⁶)","x^(3/4) = ⁴√(x³); x²"],
["Dado de 64 cm³: ¿arista? Si la triplicas, ¿cuántas veces crece el volumen?","4 cm; 3³ = 27 veces"]],
videos:[["Leyes de los exponentes (profe Alex)","Matemáticas profe Alex leyes de los exponentes"],["Producto y cociente de potencias (Julioprofe)","Julioprofe producto y cociente de potencias igual base"],["Potencia de potencia (Daniel Carreón)","Daniel Carreón potencia de una potencia producto cociente"],["Exponentes fraccionarios (Khan Academy Español)","Khan Academy Español exponentes fraccionarios radicales"],["Exponentes racionales, ejercicios (Julioprofe)","Julioprofe exponentes racionales ejercicios"]]}
];

// Banco de preguntas para el modo Quiz. c = índice de la respuesta correcta.
const QUIZ = [
{t:1,q:"¿Cuál de los dos números es mayor?",o:["−3/4","−1/2","Son iguales","No se puede comparar"],c:1,e:"Entre dos negativos, el más cercano al cero es mayor. −1/2 está a 0.5 del cero y −3/4 a 0.75."},
{t:1,q:"|−7| + (−7) =",o:["0","14","−14","7"],c:0,e:"|−7| = 7 y 7 + (−7) = 0. El valor absoluto nunca es negativo."},
{t:1,q:"¿Cuál de estos números es irracional?",o:["√16","0.121212…","√15","−8/3"],c:2,e:"√16 = 4, 0.1212… es periódico y −8/3 es fracción: todos son racionales. √15 no es raíz exacta."},
{t:1,q:"Un buzo está a −18 m y sube 7 m. ¿A qué profundidad queda?",o:["−25 m","−11 m","11 m","−7 m"],c:1,e:"−18 + 7 = −11 m. Subir significa avanzar hacia la derecha en la recta."},
{t:2,q:"¿Qué propiedad justifica 25 × 17 × 4 = (25 × 4) × 17?",o:["Conmutativa","Asociativa","Distributiva","Identidad"],c:1,e:"Cambiar la agrupación sin cambiar el orden es la propiedad asociativa. Aquí conviene porque 25 × 4 = 100."},
{t:2,q:"Desarrolla −2(5y − 6):",o:["−10y − 12","−10y + 12","10y − 12","−7y + 12"],c:1,e:"El −2 multiplica a ambos términos: −10y + 12. Multiplicar por negativo cambia los signos."},
{t:2,q:"Factoriza 12x + 18:",o:["6(2x + 3)","3(4x + 9)","2(6x + 9)","12(x + 6)"],c:0,e:"El mayor factor común de 12 y 18 es 6: 12x + 18 = 6(2x + 3). Comprueba desarrollando."},
{t:2,q:"Calcula mentalmente 7 × 98:",o:["686","776","694","6 860"],c:0,e:"7(100 − 2) = 700 − 14 = 686. Es la propiedad distributiva como atajo."},
{t:3,q:"El MCM de 12 y 18 es:",o:["6","24","36","216"],c:2,e:"12 = 2²·3 y 18 = 2·3². El MCM toma los mayores exponentes: 2²·3² = 36."},
{t:3,q:"El MCD de 20, 30 y 45 es:",o:["5","10","15","3"],c:0,e:"El factor común más grande de los tres es 5. El MCD nunca puede ser mayor que el menor número."},
{t:3,q:"5/6 + 3/4 =",o:["8/10","19/12","6/4","19/24"],c:1,e:"El MCM de 6 y 4 es 12: 10/12 + 9/12 = 19/12 = 1 7/12."},
{t:3,q:"Dos autobuses salen a las 6:00, uno cada 15 min y otro cada 20. ¿Cuándo vuelven a coincidir?",o:["6:20","6:30","7:00","7:20"],c:2,e:"MCM(15, 20) = 60 min, así que coinciden una hora después: a las 7:00."},
{t:4,q:"¿Cuánto es el 35% de 260?",o:["91","810","9.1","78"],c:0,e:"0.35 × 260 = 91. También: 10% es 26, entonces 35% = 3(26) + 13 = 91."},
{t:4,q:"18 de 24, ¿qué porcentaje representa?",o:["75%","18%","24%","80%"],c:0,e:"18/24 = 3/4 = 0.75 = 75%."},
{t:4,q:"Escribe 0.5% como decimal:",o:["0.5","0.05","0.005","5"],c:2,e:"Para pasar de % a decimal se divide entre 100: 0.5 ÷ 100 = 0.005."},
{t:4,q:"Tenis de $1 450 con 30% de descuento y después 16% de IVA:",o:["$1 177.40","$1 015","$1 682","$1 183"],c:0,e:"1 450 × 0.70 × 1.16 = 1 177.40. El IVA se calcula sobre el precio ya descontado."},
{t:5,q:"2³ × 2⁴ =",o:["4⁷","2⁷","2¹²","8⁷"],c:1,e:"Misma base: se suman exponentes, 2^(3+4) = 2⁷. La base no cambia."},
{t:5,q:"5⁻² =",o:["−25","1/25","−10","25"],c:1,e:"Exponente negativo significa inverso: 5⁻² = 1/5² = 1/25."},
{t:5,q:"8^(2/3) =",o:["4","2","16","64"],c:0,e:"Primero la raíz: ∛8 = 2; luego se eleva: 2² = 4."},
{t:5,q:"(−2)⁴ =",o:["−16","16","−8","8"],c:1,e:"Los paréntesis importan: (−2)⁴ = 16, pero −2⁴ = −16."}
];

// Tarjetas de repaso: q = frente, a = dorso.
const CARDS = [
{t:1,q:"¿Qué significa |x|?",a:"La distancia de x al cero. Nunca es negativa: |−5| = 5 y |5| = 5."},
{t:1,q:"Regla para comparar números negativos",a:"El más cercano al cero es mayor: −1 > −4. En la recta, siempre gana el de la derecha."},
{t:1,q:"Racional vs. irracional",a:"Racional = a/b con b ≠ 0 (decimal exacto o periódico). Irracional = decimal infinito sin patrón: π, √2."},
{t:1,q:"12 − (−3)",a:"15. Restar un negativo equivale a sumar su opuesto: 12 + 3."},
{t:2,q:"Propiedad conmutativa",a:"El orden no cambia el resultado en la suma ni en la multiplicación. No aplica a resta ni división."},
{t:2,q:"Propiedad asociativa",a:"La agrupación no cambia el resultado en la suma ni en la multiplicación: (2·5)·7 = 2·(5·7)."},
{t:2,q:"Propiedad distributiva",a:"a(b + c) = ab + ac. Si el factor es negativo, cambia todos los signos: −2(5y − 6) = −10y + 12."},
{t:2,q:"Factor común",a:"Saca el mayor factor común: 12x + 18 = 6(2x + 3). Verifícalo desarrollando."},
{t:3,q:"¿Cuándo usar MCM?",a:"Cuando algo vuelve a coincidir: «al mismo tiempo», «cada cuántos días»."},
{t:3,q:"¿Cuándo usar MCD?",a:"Cuando quieres partes iguales lo más grandes posible sin que sobre."},
{t:3,q:"Error típico: 3/4 + 3/4",a:"Es 6/4 = 3/2, no 6/8. Con igual denominador se opera solo el numerador."},
{t:3,q:"Suma con distinto denominador",a:"1) MCM de denominadores, 2) fracciones equivalentes, 3) opera numeradores, 4) simplifica."},
{t:4,q:"Razón vs. tasa",a:"Razón compara cantidades de la misma unidad (2:3); tasa compara unidades distintas (60 km/h)."},
{t:4,q:"Condición de una proporción",a:"Si a/b = c/d, entonces a·d = b·c (productos cruzados)."},
{t:4,q:"Atajos de porcentaje",a:"10% = mueve el punto un lugar; 5% = mitad del 10%; 50% = la mitad; 25% = un cuarto."},
{t:4,q:"Descuento e IVA",a:"Descuento 20% → multiplicar por 0.80. IVA 16% → multiplicar por 1.16. El orden sí importa."},
{t:5,q:"Misma base al multiplicar",a:"aᵐ · aⁿ = aᵐ⁺ⁿ. La base se conserva: 2³ · 2⁴ = 2⁷, nunca 4⁷."},
{t:5,q:"Exponente cero y negativo",a:"a⁰ = 1 y a⁻ⁿ = 1/aⁿ. Por ejemplo 2⁻³ = 1/8."},
{t:5,q:"Exponente fraccionario",a:"a^(m/n) = (ⁿ√a)ᵐ. El denominador indica el índice de la raíz y el numerador, la potencia."},
{t:5,q:"Signo de una potencia negativa",a:"(−a)ⁿ es positivo si n es par y negativo si n es impar. Cuidado: −aⁿ = −(aⁿ)."}
];
