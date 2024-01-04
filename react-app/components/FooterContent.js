import React from "react";
import { Box, Divider, Grid, IconButton } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const FooterContent = () => {
  return (
    <footer>
      <Box
        sx={{
          paddingTop: 4,
        }}
      >
        <Divider />
        <Grid container sx={{ padding: 2 }} justifyContent="end" spacing={1}>
          <Grid item>
            <IconButton
              href="http://www.linkedin.com/in/linnan-shi-907109aa/"
              color="primary"
              target="_blank"
            >
              <LinkedInIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              href="https://github.com/selina350"
              color="primary"
              target="_blank"
            >
              <GitHubIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </footer>
  );
};


export default FooterContent
