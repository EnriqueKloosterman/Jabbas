# Jabbas

14/12/2021
    agregado el modelo dedetail sin logica en los controllers



    <div class="img-collections">
    <% collection.forEach(element => { %>
        <img src="/images/logos/<%= element.image %>" alt="" width="40%">
    <% }) %>
</div>

<div class="img-collection">
    <% for( let i = 0; i < collection.length; i++ ) { %>
        <a href="/products/collections/<%= collection[i].name %>">
            <img src="/images/logos/<%= collection[i].image %>" alt="" width="30%">
        </a>
    <% } %>
</div>
