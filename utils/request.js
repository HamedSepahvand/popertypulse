const apiDomain = process.env.NEXT_PRIVATE_API_DOMAIN || null;

// Fetch All Properties
export async function fetchProperties({ showFeatured = false } = {}) {
  try {
    if (!apiDomain) {
      return { properties: [] };
    }

    const res = await fetch(
      `${apiDomain}/properties${showFeatured ? "/featured" : ""}`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data!");
    }

    return res.json();
  } catch (err) {
    console.log(err);
    return { properties: [] };
  }
}

// Fetch single property
export async function fetchProperty(id) {
  try {
    if (!apiDomain) {
      return null;
    }

    const res = await fetch(`${apiDomain}/properties/${id}`);

    if (!res.ok) {
      throw new Error("Failed to fetch data!");
    }

    return res.json();
  } catch (err) {
    console.log(err);
    return null;
  }
}
