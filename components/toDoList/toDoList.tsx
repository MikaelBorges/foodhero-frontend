export function ToDoList() {
  return (
    <ol className="list-decimal pl-4 text-red-500">
      <li>
        au clic sur le logo (et sur le bouton retour) les filtres restent
        cochés, et le reset des filtres ne fonctionne plus
      </li>
      <li>la pagination est un peu statique et n&apos;évolue pas</li>
      <li>la page active dans la pagination n&apos;est pas visible</li>
      <li>ios : effet de zoom sur les champs qui reste actif même après</li>
      <li>retirer les badges des cards</li>
      <li>
        le dev mode ne se charge pas correctement depuis le local storage au
        démarrage
      </li>
    </ol>
  );
}
