export interface Chant {
  id: string;
  title: string;
  lyrics: string; // We will use \n for line breaks
  language: "ca" | "es"; // Useful for future filtering or badges
}

export const chants: Chant[] = [
  {
    id: "cant-del-barca",
    title: "El Cant del Barça (Anthem)",
    language: "ca",
    lyrics: `Tot el camp, és un clam
som la gent blaugrana.
Tant se val d'on venim
si del sud o del nord
ara estem d'acord, estem d'acord,
una bandera ens agermana.

Blaugrana al vent
un crit valent
tenim un nom el sap tothom:
Barça, Barça, Baaaaaaaaarça!

Jugadors, seguidors
tots units fem força.
Son molts anys plens d'afanys,
son molts gols que hem cridat
i s'ha demostrat, s'ha demostrat,
que mai ningú no ens podrà tòrcer.

Blaugrana al vent
un crit valent
tenim un nom el sap tothom:
Barça, Barça, Baaaaaaaaarça!`,
  },
  {
    id: "un-dia-de-partit",
    title: "Un Dia de Partit",
    language: "ca",
    lyrics: `Un dia de partit
Al gol nord vaig anar
Només entrar a la grada
Em vaig enamorar

El cor em bategava
No em preguntis per què
Del Barça sóc supporter
Sempre t'animaré

Ale ale ale!
Ale ale ale!
Ale ale ale!
Ale ale ale!`,
  },
  {
    id: "1899",
    title: "1899",
    language: "ca",
    lyrics: `Mil vuit-cents noranta-nou
Neix el club que porto al cor
Blaugrana són els colors
Futbol Club Barcelona!

Lo, Lo-lo-lo, lo-lo-lo...
Futbol Club Barcelona!`,
  },
  {
    id: "cant-de-danny",
    title: "Vamos Barça (Cant de Danny)",
    language: "es",
    lyrics: `¡Vamos! ¡Vamos! ¡Vamos Barça! ¡Vamo' a ganar!
¡Esta Penya no te deja de apoyar!
¡Yo te sigo a todas partes a donde vas!
¡Cada día te amo más!

¡Tus colores yo los llevo en mi corazón!
¡Y tu escudo siempre ha sido el mejor!
¡Con orgullo grito que eres nuestro campeón!
¡Nunca habrá otro mejor!`,
  },
  {
    id: "lamine-yamal",
    title: "Lamine Yamal",
    language: "es",
    lyrics: `Lamine Yamal de Mataró
Esta Penya te apoya.
¡Lamine Yamal! (x2)
Lamine Yamal Oh Oh Oh!

Eres nuestro niño dorado
¡Lamine Yamal! (x2)
Lamine Yamal Oh Oh Oh!
¡Nunca te dejará de amar!`,
  },
  {
    id: "serem-campions",
    title: "Un Sentiment",
    language: "ca",
    lyrics: `Un sentiment
Molt dins de mi
T'animaré
Cada partit

(Repeat)`,
  },
  {
    id: "i-si-tots",
    title: "I Si Tots Animem",
    language: "ca",
    lyrics: `I si tots animem!
I si tots animem!
I si tots animem guanyarem!`,
  },
  {
    id: "del-barca-som",
    title: "Del Barça Som i Serem",
    language: "ca",
    lyrics: `Del Barça som i serem
I avui també guanyarem
Pel Barça, Pel Barça
I Per Catalunya
Fins a la mort lluitarem!`,
  },
  {
    id: "mai-caminaras-sol",
    title: "Barça Mai Caminaràs Sol",
    language: "es",
    lyrics: `Cada partido te vengo a animar,
Lo nuestro es una enfermedad,
Y solo existe una solución,
Es poder verte otra vez campeón.

Devoció, rebel·lia i animació
Barça mai caminaràs sol!`,
  },
  {
    id: "barcelona-ale",
    title: "Barcelona Alé",
    language: "ca",
    lyrics: `Barcelona alé, Barcelona alé!
Barcelona alé, alé, alé!`,
  },
  {
    id: "madridista-qui-no-boti",
    title: "Madridista Qui No Boti",
    language: "ca",
    lyrics: `Madridista qui no boti, eh, eh!
Madridista qui no boti, eh, eh!`,
  },
  {
    id: "jo-soc-culer",
    title: "Jo Sóc Culer",
    language: "ca",
    lyrics: `Jo sóc culer,
Blau i grana és el meu cor
Tu ets l'orgull de Barcelona
De Barcelona arreu del món!`,
  },
  {
    id: "jo-soc-supporter",
    title: "Jo Sóc Supporter",
    language: "ca",
    lyrics: `Jo sóc supporter
T'animo a gol nord
Cada cop més fort
Mai et deixaré
Van passant els anys
I tu Barça has de saber
Que sempre t'animaré
Que mai sol caminaràs!`,
  },
  {
    id: "hay-un-color",
    title: "Hay Un Color",
    language: "es",
    lyrics: `Hay un color que recorre el planeta,
Bajo tu camiseta, y es el mismo de mi corazón.
Yo te amaré por encima de todo,
Más allá del escudo, sólo unidos podremos vencer.`,
  },
];
